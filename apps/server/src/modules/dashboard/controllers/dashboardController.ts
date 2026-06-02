import { NextFunction, Response } from 'express';

import {
  GoalSortKeys,
  GoalStatus,
  TransactionType,
} from '@savings-tracker/shared';

import { ControllerRequest } from '../../../types/controllerType';
import {
  addGoal,
  addTransaction,
  editGoal,
  fetchDashboard,
  fetchGoal,
  fetchGoalTransactions,
  fetchUserGoals,
  fetchUserTransactions,
  removeGoal,
} from '../services/dashboardService';
import {
  CreateGoalBody,
  CreateTransactionBody,
  GetTransactionsQuery,
  GetUserGoalsQuery,
  GoalIdParams,
  UpdateGoalBody,
} from '../types/dashboardType';

export const getDashboard = async (
  req: ControllerRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await fetchDashboard({ userId: req.user.id });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserGoals = async (
  req: ControllerRequest<object, object, GetUserGoalsQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { status, sortBy } = req.query;

    const goals = await fetchUserGoals({
      userId: req.user.id,
      status: status as GoalStatus | undefined,
      sortBy: sortBy as GoalSortKeys | undefined,
    });

    return res.status(200).json({
      success: true,
      data: { goals },
    });
  } catch (err) {
    next(err);
  }
};

export const getGoal = async (
  req: ControllerRequest<GoalIdParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const goal = await fetchGoal({ userId: req.user.id, id: Number(id) });

    return res.status(200).json({
      success: true,
      data: { goal },
    });
  } catch (err) {
    next(err);
  }
};

export const createGoal = async (
  req: ControllerRequest<object, CreateGoalBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { goalName, goalTarget, deadline } = req.body;

    const newGoal = await addGoal({
      userId: req.user.id,
      goalName,
      goalTarget,
      deadline,
    });

    return res.status(201).json({
      success: true,
      data: { newGoal },
    });
  } catch (err) {
    next(err);
  }
};

export const updateGoal = async (
  req: ControllerRequest<GoalIdParams, UpdateGoalBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { goalName, goalTarget, deadline } = req.body;

    const updatedGoal = await editGoal({
      userId: req.user.id,
      id: Number(id),
      goalName,
      goalTarget,
      deadline,
    });

    return res.status(200).json({
      success: true,
      data: { updatedGoal },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteGoal = async (
  req: ControllerRequest<GoalIdParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const deletedGoal = await removeGoal({
      userId: req.user.id,
      id: Number(id),
    });

    return res.status(200).json({
      success: true,
      data: { deletedGoal },
    });
  } catch (err) {
    next(err);
  }
};

export const createTransaction = async (
  req: ControllerRequest<GoalIdParams, CreateTransactionBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { amount, note, transactionType } = req.body;

    const newTransaction = await addTransaction({
      userId: req.user.id,
      goalId: Number(id),
      amount,
      note,
      transactionType,
    });

    return res.status(201).json({
      success: true,
      data: { newTransaction },
    });
  } catch (err) {
    next(err);
  }
};

export const getGoalTransactions = async (
  req: ControllerRequest<GoalIdParams, object, GetTransactionsQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { transactionType } = req.query;

    const goalTransactions = await fetchGoalTransactions({
      userId: req.user.id,
      goalId: Number(id),
      transactionType: transactionType as TransactionType | undefined,
    });

    return res.status(200).json({
      success: true,
      data: { goalTransactions },
    });
  } catch (err) {
    next(err);
  }
};

export const getUserTransactions = async (
  req: ControllerRequest<object, object, GetTransactionsQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { transactionType } = req.query;

    const transactions = await fetchUserTransactions({
      userId: req.user.id,
      transactionType: transactionType as TransactionType | undefined,
    });

    return res.status(200).json({
      success: true,
      data: { transactions },
    });
  } catch (err) {
    next(err);
  }
};
