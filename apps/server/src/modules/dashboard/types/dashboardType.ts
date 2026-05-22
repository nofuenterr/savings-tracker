import { ParamsDictionary } from 'express-serve-static-core';

interface Goal {
  id: number;
  user_id: number;
  goal_name: string;
  goal_target: number;
  deadline: Date | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface UserIdParams {
  userId: number;
}

export interface TotalSavingsRow {
  total_savings: number;
}

export interface MonthlyActivityRow {
  month: Date;
  deposits: number;
  withdrawals: number;
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

export interface GetUserGoalsQuery {
  status?: string;
  sortBy?: string;
}

export interface FindGoalsByUserIdParams {
  userId: number;
  status?: GoalStatus;
  sortBy?: GoalSortKeys;
}

export interface FindGoalByIdParams {
  userId: number;
  id: number;
}

export interface FindGoalBalanceByIdParams {
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

export type GoalRow = Omit<Goal, 'updated_at' | 'deleted_at'>;

export type GoalWithBalanceRow = GoalRow & { current: number };

export interface GoalBalanceRow {
  current: number;
}

export type UpdatedGoalRow = Omit<Goal, 'created_at' | 'deleted_at'>;

export type DeletedGoalRow = Pick<Goal, 'id' | 'goal_name'> & {
  deleted_at: Date;
};

export type TransactionType = 'deposit' | 'withdrawal';

export interface InsertTransactionParams {
  userId: number;
  goalId: number;
  amount: number;
  note?: string;
  transactionType: TransactionType;
}

export interface FindTransactionsByGoalIdParams {
  userId: number;
  goalId: number;
}

export interface FindTransactionsByGoalIdAndTypeParams extends FindTransactionsByGoalIdParams {
  transactionType: TransactionType;
}

export interface FindTransactionsByUserIdParams {
  userId: number;
}

export interface FindTransactionsByUserIdAndTypeParams extends FindTransactionsByUserIdParams {
  transactionType: TransactionType;
}

export interface TransactionRow {
  id: number;
  user_id: number;
  goal_id: number;
  transaction_type: TransactionType;
  amount: number;
  note: string | null;
  created_at: Date;
}

export interface FetchGoalTransactionsParams {
  userId: number;
  goalId: number;
  transactionType?: TransactionType;
}

export interface FetchUserTransactionsParams {
  userId: number;
  transactionType?: TransactionType;
}

export interface GoalIdParams extends ParamsDictionary {
  id: string;
}

export type CreateGoalBody = Omit<InsertGoalParams, 'userId'>;

export type UpdateGoalBody = Omit<UpdateGoalByIdParams, 'userId' | 'id'>;

export type CreateTransactionBody = Omit<
  InsertTransactionParams,
  'userId' | 'goalId'
>;

export interface GetTransactionsQuery {
  transactionType?: string;
}
