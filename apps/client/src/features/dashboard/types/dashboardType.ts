import type { TransactionType } from '@savings-tracker/shared';

interface MonthlyActivity {
  month: Date;
  deposits: number;
  withdrawals: number;
}

export interface GetDashboardResponse {
  totalSavings: number;
  monthlyActivity: MonthlyActivity[];
  activeGoals: number;
  completedGoals: number;
}

interface Goal {
  id: number;
  user_id: number;
  created_at: Date;
  goal_name: string;
  goal_target: number;
  deadline: Date | null;
}

interface GoalData {
  current: number;
  progress: number;
}

type GoalWithData = Goal & GoalData;

export interface GetUserGoalsResponse {
  goals: GoalWithData[];
}

export interface GetGoalResponse {
  goal: GoalWithData;
}

export interface CreateGoalResponse {
  newGoal: Goal;
}

type UpdatedGoal = Omit<Goal, 'created_at'> & { updated_at: Date };

export interface UpdateGoalResponse {
  updatedGoal: UpdatedGoal;
}

type DeletedGoal = Pick<Goal, 'id' | 'goal_name'>;

export interface DeleteGoalResponse {
  deletedGoal: DeletedGoal;
}

interface Transaction {
  id: number;
  user_id: number;
  goal_id: number;
  transaction_type: TransactionType;
  amount: number;
  note: string | null;
  created_at: Date;
}

export interface CreateTransactionResponse {
  newTransaction: Transaction;
}

export interface GetGoalTransactionsResponse {
  goalTransactions: Transaction[];
}

export interface GetUserTransactionsResponse {
  transactions: Transaction[];
}

export interface GetUserGoalsParams {
  status?: string;
  sortBy?: string;
}

export interface IdParams {
  id: number;
}

export interface CreateGoalParams {
  goalName: string;
  goalTarget: number;
  deadline?: Date;
}

export interface UpdateGoalParams {
  id: number;
  goalName?: string;
  goalTarget?: number;
  deadline?: Date;
}

export interface CreateTransactionPayload {
  amount: number;
  note?: string;
  transactionType: TransactionType;
}

export interface CreateTransactionParams extends CreateTransactionPayload {
  id: number;
}

export interface GetGoalTransactionsParams {
  id: number;
  transactionType?: TransactionType;
}

export interface GetUserTransactionsParams {
  transactionType?: TransactionType;
}
