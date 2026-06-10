import { z } from 'zod';

import {
  createGoalBodySchema,
  createTransactionBodySchema,
  transactionTypes,
  updateGoalBodySchema,
} from '@savings-tracker/shared';

import { goalSortOptions } from '../utils/dashboardUtil';

const idParam = z.object({
  id: z.string().regex(/^[1-9]\d*$/, 'ID must be a positive integer'),
});

const goalSortKeys = Object.keys(goalSortOptions) as [string, ...string[]];

export const getUserGoalsSchema = z.object({
  query: z.object({
    status: z.enum(['all', 'inProgress', 'completed', 'notStarted']).optional(),
    sortBy: z.enum(goalSortKeys).optional(),
  }),
});

export const getGoalSchema = z.object({
  params: idParam,
});

export const createGoalSchema = z.object({
  body: createGoalBodySchema,
});

export const updateGoalSchema = z.object({
  params: idParam,
  body: updateGoalBodySchema,
});

export const deleteGoalSchema = z.object({
  params: idParam,
});

export const createTransactionSchema = z.object({
  params: idParam,
  body: createTransactionBodySchema,
});

export const getGoalTransactionsSchema = z.object({
  params: idParam,
  query: z.object({
    transactionType: transactionTypes.optional(),
  }),
});

export const getUserTransactionsSchema = z.object({
  query: z.object({
    transactionType: transactionTypes.optional(),
  }),
});
