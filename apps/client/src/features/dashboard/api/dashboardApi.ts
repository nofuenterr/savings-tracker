import type { DataResponse } from '../../../types/api';
import api from '../../../lib/axios';
import type {
  CreateGoalParams,
  CreateGoalResponse,
  CreateTransactionParams,
  CreateTransactionResponse,
  DeleteGoalResponse,
  GetDashboardResponse,
  GetGoalResponse,
  GetGoalTransactionsParams,
  GetGoalTransactionsResponse,
  GetUserGoalsParams,
  GetUserGoalsResponse,
  GetUserTransactionsParams,
  GetUserTransactionsResponse,
  IdParams,
  UpdateGoalParams,
  UpdateGoalResponse,
} from '../types/dashboardType';

export const getDashboard = async () => {
  const { data } =
    await api.get<DataResponse<GetDashboardResponse>>('/dashboard');

  return data.data;
};

export const getUserGoals = async ({ status, sortBy }: GetUserGoalsParams) => {
  const { data } = await api.get<DataResponse<GetUserGoalsResponse>>(
    '/dashboard/goals',
    {
      params: { status, sortBy },
    },
  );

  return data.data;
};

export const getGoal = async ({ id }: IdParams) => {
  const { data } = await api.get<DataResponse<GetGoalResponse>>(
    `/dashboard/goals/${id}`,
  );

  return data.data;
};

export const createGoal = async ({
  goalName,
  goalTarget,
  deadline,
}: CreateGoalParams) => {
  const { data } = await api.post<DataResponse<CreateGoalResponse>>(
    '/dashboard/goals',
    {
      goalName,
      goalTarget,
      deadline,
    },
  );

  return data.data;
};

export const updateGoal = async ({
  id,
  goalName,
  goalTarget,
  deadline,
}: UpdateGoalParams) => {
  const { data } = await api.patch<DataResponse<UpdateGoalResponse>>(
    `/dashboard/goals/${id}`,
    {
      goalName,
      goalTarget,
      deadline,
    },
  );

  return data.data;
};

export const deleteGoal = async ({ id }: IdParams) => {
  const { data } = await api.delete<DataResponse<DeleteGoalResponse>>(
    `/dashboard/goals/${id}`,
  );

  return data.data;
};

export const createTransaction = async ({
  id,
  amount,
  note,
  transactionType,
}: CreateTransactionParams) => {
  const { data } = await api.post<DataResponse<CreateTransactionResponse>>(
    `/dashboard/goals/${id}/transactions`,
    {
      amount,
      note,
      transactionType,
    },
  );

  return data.data;
};

export const getGoalTransactions = async ({
  id,
  transactionType,
}: GetGoalTransactionsParams) => {
  const { data } = await api.get<DataResponse<GetGoalTransactionsResponse>>(
    `/dashboard/goals/${id}/transactions`,
    {
      params: { transactionType },
    },
  );

  return data.data;
};

export const getUserTransactions = async ({
  transactionType,
}: GetUserTransactionsParams) => {
  const { data } = await api.get<DataResponse<GetUserTransactionsResponse>>(
    '/dashboard/transactions',
    {
      params: { transactionType },
    },
  );

  return data.data;
};
