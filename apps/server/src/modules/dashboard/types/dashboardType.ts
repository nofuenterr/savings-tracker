import z from 'zod';
import { ParamsDictionary } from 'express-serve-static-core';

import {
  createGoalSchema,
  createTransactionSchema,
  updateGoalSchema,
} from '../schemas/dashboardSchema';

// --- DB Rows (what comes back from postgres) ---
interface Goal {
  id: number;
  user_id: number;
  goal_name: string;
  goal_target: number;
  deadline: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface TotalSavingsRow {
  total_savings: number;
}

export interface MonthlyActivityRow {
  month: Date;
  deposits: number;
  withdrawals: number;
}

export interface GoalCountRow {
  active: number;
  completed: number;
}

export type GoalRow = Omit<Goal, 'updated_at'>;

export type GoalWithBalanceAndProgressRow = GoalRow & {
  current: number;
  progress: number;
};

export interface GoalBalanceRow {
  current: number;
}

export type UpdatedGoalRow = Omit<Goal, 'created_at'>;

export type DeletedGoalRow = Pick<Goal, 'id' | 'goal_name'>;

export interface TransactionRow {
  id: number;
  user_id: number;
  goal_id: number;
  transaction_type: TransactionType;
  amount: number;
  note: string | null;
  created_at: Date;
}

// --- Repository Params ---
export interface FindGoalBalanceByIdParams {
  id: number;
}

export interface FindTransactionsByGoalIdParams {
  userId: number;
  goalId: number;
}

export interface FindTransactionsByGoalIdAndTypeParams {
  userId: number;
  goalId: number;
  transactionType: TransactionType;
}

export interface FindTransactionsByUserIdAndTypeParams {
  userId: number;
  transactionType: TransactionType;
}

// --- Service Params ---
export interface FetchGoalTransactionsParams {
  userId: number;
  goalId: number;
  transactionType?: TransactionType;
}

export interface FetchUserTransactionsParams {
  userId: number;
  transactionType?: TransactionType;
}

// --- Controller Types (body, params, query) ---
export interface GoalIdParams extends ParamsDictionary {
  id: string;
}

export interface GetUserGoalsQuery {
  status?: string;
  sortBy?: string;
}

export type CreateGoalBody = z.infer<typeof createGoalSchema>['body'];

export type UpdateGoalBody = z.infer<typeof updateGoalSchema>['body'];

export type CreateTransactionBody = z.infer<
  typeof createTransactionSchema
>['body'];

export interface GetTransactionsQuery {
  transactionType?: string;
}

// --- Shared/General ---
export type TransactionType = 'deposit' | 'withdrawal';

export interface UserIdParams {
  userId: number;
}

export type GoalStatus = 'inProgress' | 'completed' | 'notStarted';

export type GoalSortKeys =
  | 'newest'
  | 'oldest'
  | 'goal_target_desc'
  | 'goal_target_asc'
  | 'deadline_desc'
  | 'deadline_asc'
  | 'progress_desc'
  | 'progress_asc'
  | 'amount_saved_desc'
  | 'amount_saved_asc'
  | 'goal_name_desc'
  | 'goal_name_asc';

export interface FindGoalsByUserIdParams {
  userId: number;
  status?: GoalStatus;
  sortBy?: GoalSortKeys;
}

export interface FindGoalByIdParams {
  userId: number;
  id: number;
}

export interface InsertGoalParams {
  userId: number;
  goalName: string;
  goalTarget: number;
  deadline?: Date;
}

export interface UpdateGoalByIdParams {
  userId: number;
  id: number;
  goalName?: string;
  goalTarget?: number;
  deadline?: Date;
}

export interface DeleteGoalByIdParams {
  userId: number;
  id: number;
}

export interface InsertTransactionParams {
  userId: number;
  goalId: number;
  amount: number;
  note?: string;
  transactionType: TransactionType;
}

// --- Utils ---
type GoalColumn =
  | 'created_at'
  | 'goal_target'
  | 'deadline'
  | 'progress'
  | 'current'
  | 'goal_name';

type SortDirection = 'DESC' | 'ASC';

type GoalTable = 'g' | 'gb';

interface GoalSortMeta {
  column: GoalColumn;
  direction: SortDirection;
  table?: GoalTable;
}

export type GoalSortOptions = Record<GoalSortKeys, GoalSortMeta>;
