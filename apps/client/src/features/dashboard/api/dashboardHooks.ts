import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import type {
  CreateTransactionPayload,
  GetGoalTransactionsParams,
  GetUserGoalsParams,
  GetUserTransactionsParams,
  IdParams,
} from '../types/dashboardType';
import {
  createGoal,
  createTransaction,
  deleteGoal,
  getDashboard,
  getGoal,
  getGoalTransactions,
  getUserGoals,
  getUserTransactions,
  updateGoal,
} from './dashboardApi';

export function useGetDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboard,
  });
}

export function useGetUserGoals({ status, sortBy }: GetUserGoalsParams) {
  return useQuery({
    queryKey: ['goals', { status, sortBy }],
    queryFn: () => getUserGoals({ status, sortBy }),
  });
}

export function useGetGoal({ id }: IdParams) {
  return useQuery({
    queryKey: ['goals', id],
    queryFn: () => getGoal({ id }),
  });
}

export function useCreateGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
  });
}

export function useUpdateGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateGoal,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['goals', id] });
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
  });
}

export function useDeleteGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useCreateTransaction({ id }: IdParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTransactionPayload) =>
      createTransaction({ id, ...payload }),
    onSuccess: ({ newTransaction }) => {
      queryClient.invalidateQueries({
        queryKey: ['goals', newTransaction.goal_id],
      });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useGetGoalTransactions({
  id,
  transactionType,
}: GetGoalTransactionsParams) {
  return useQuery({
    queryKey: ['goals', id, 'transactions', transactionType],
    queryFn: () => getGoalTransactions({ id, transactionType }),
  });
}

export function useGetUserTransactions({
  transactionType,
}: GetUserTransactionsParams) {
  return useQuery({
    queryKey: ['user', 'transactions', transactionType],
    queryFn: () => getUserTransactions({ transactionType }),
  });
}
