import {} from 'date-fns';

import { Projection } from '@savings-tracker/shared';

import { BadRequestError, NotFoundError } from '../../../utils/errors';
import {
  insertGoal,
  insertTransaction,
  deleteGoalById,
  findGoalById,
  findGoalsByUserId,
  findTransactionsByGoalId,
  findTransactionsByGoalIdAndType,
  findTransactionsByUserId,
  findTransactionsByUserIdAndType,
  findUserTotalSavingsByUserId,
  updateGoalById,
  findUserMonthlyActivityByUserId,
  findGoalBalanceById,
  findUserGoalCountsByUserId,
  findTransactionDetailsByGoalId,
} from '../repositories/dashboardRepository';
import {
  InsertGoalParams,
  InsertTransactionParams,
  DeleteGoalByIdParams,
  FetchGoalTransactionsParams,
  FetchUserTransactionsParams,
  FindGoalByIdParams,
  UpdateGoalByIdParams,
  UserIdParams,
  FindGoalsByUserIdParams,
} from '../types/dashboardType';
import { addDaysFromNow, getDaysDifference } from '../utils/dashboardUtil';

export const fetchDashboard = async ({ userId }: UserIdParams) => {
  const totalSavings = await findUserTotalSavingsByUserId({ userId });
  const monthlyActivity = await findUserMonthlyActivityByUserId({ userId });
  const goalCounts = await findUserGoalCountsByUserId({ userId });

  return {
    totalSavings: totalSavings?.total_savings ?? 0,
    monthlyActivity,
    activeGoals: goalCounts?.active ?? 0,
    completedGoals: goalCounts?.completed ?? 0,
  };
};

export const fetchUserGoals = async ({
  userId,
  status,
  sortBy = 'newest',
}: FindGoalsByUserIdParams) => {
  return findGoalsByUserId({ userId, status, sortBy });
};

export const fetchGoal = async ({ userId, id }: FindGoalByIdParams) => {
  const goal = await findGoalById({ userId, id });

  if (!goal) throw new NotFoundError('Goal not found');

  return goal;
};

export const fetchGoalProjection = async ({
  userId,
  id,
}: FindGoalByIdParams): Promise<Projection> => {
  const goal = await findGoalById({ userId, id });

  if (!goal) throw new NotFoundError('Goal not found');

  if (goal.current >= goal.goal_target)
    return {
      status: 'complete',
    };

  const details = await findTransactionDetailsByGoalId({ userId, goalId: id });

  if (details.transaction_count === 0)
    return {
      status: 'noProjection',
    };

  const daySpan =
    getDaysDifference({
      date1: details.last_transaction_at,
      date2: details.first_transaction_at,
    }) || 1;
  const dailyRate = details.total_net / daySpan;

  if (dailyRate <= 0)
    return {
      status: 'stalled',
    };

  const remaining = goal.goal_target - goal.current;
  const daysToCompletion = remaining / dailyRate;
  const projectedDate = addDaysFromNow(daysToCompletion);

  return { status: 'onTrack', projectedDate };
};

export const addGoal = async ({
  userId,
  goalName,
  goalTarget,
  deadline,
}: InsertGoalParams) => {
  const goal = await insertGoal({ userId, goalName, goalTarget, deadline });

  if (!goal) throw new BadRequestError('Failed to create goal');

  return goal;
};

export const editGoal = async ({
  userId,
  id,
  goalName,
  goalTarget,
  deadline,
}: UpdateGoalByIdParams) => {
  const goal = await updateGoalById({
    userId,
    id,
    goalName,
    goalTarget,
    deadline,
  });

  if (!goal) throw new NotFoundError('Goal not found');

  return goal;
};

export const removeGoal = async ({ userId, id }: DeleteGoalByIdParams) => {
  const goal = await deleteGoalById({ userId, id });

  if (!goal) throw new NotFoundError('Goal not found');

  return goal;
};

export const addTransaction = async ({
  userId,
  goalId,
  amount,
  note,
  transactionType,
}: InsertTransactionParams) => {
  const goal = await findGoalById({ userId, id: goalId });
  if (!goal) throw new NotFoundError('Goal not found');

  if (transactionType === 'withdrawal') {
    const goalBalance = await findGoalBalanceById({ id: goalId });

    if (!goalBalance) throw new BadRequestError('Goal has no balance yet');

    if (amount > goalBalance.current)
      throw new BadRequestError(
        'Withdraw amount must not be greater than current goal balance',
      );
  }

  const transaction = await insertTransaction({
    userId,
    goalId,
    amount,
    note,
    transactionType,
  });

  if (!transaction) throw new BadRequestError('Failed to create transaction');

  return transaction;
};

export const fetchGoalTransactions = async ({
  userId,
  goalId,
  transactionType,
}: FetchGoalTransactionsParams) => {
  if (transactionType) {
    return findTransactionsByGoalIdAndType({ userId, goalId, transactionType });
  }

  return findTransactionsByGoalId({ userId, goalId });
};

export const fetchUserTransactions = async ({
  userId,
  transactionType,
}: FetchUserTransactionsParams) => {
  if (transactionType) {
    return findTransactionsByUserIdAndType({ userId, transactionType });
  }

  return findTransactionsByUserId({ userId });
};
