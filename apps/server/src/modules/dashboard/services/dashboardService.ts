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

export const fetchDashboard = async ({ userId }: UserIdParams) => {
  const totalSavings = await findUserTotalSavingsByUserId({ userId });

  const monthlyActivity = await findUserMonthlyActivityByUserId({ userId });

  return {
    totalSavings: totalSavings?.total_savings ?? 0,
    monthlyActivity,
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
