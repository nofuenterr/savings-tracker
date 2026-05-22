import { z } from 'zod';
import { goalSortOptions } from '../utils/dashboardUtil';

const idParam = z.object({
  id: z.string().regex(/^[1-9]\d*$/, 'ID must be a positive integer'),
});

const futureDate = z.coerce.date().refine((date) => date >= new Date(), {
  message: 'Deadline must be in the future',
});

const goalNameValue = z.string().min(3).max(30);

const transactionTypes = z.enum(['deposit', 'withdrawal']);

const positiveNumber = z.coerce.number().positive();

const goalSortKeys = Object.keys(goalSortOptions) as [string, ...string[]];

export const getUserGoalsSchema = z.object({
  query: z.object({
    status: z.enum(['inProgress', 'completed', 'notStarted']).optional(),
    sortBy: z.enum(goalSortKeys).optional(),
  }),
});

export const getGoalSchema = z.object({
  params: idParam,
});

export const createGoalSchema = z.object({
  body: z.object({
    goalName: goalNameValue,
    goalTarget: positiveNumber,
    deadline: futureDate.optional(),
  }),
});

export const updateGoalSchema = z.object({
  params: idParam,
  body: z
    .object({
      goalName: goalNameValue.optional(),
      goalTarget: positiveNumber.optional(),
      deadline: futureDate.optional(),
    })
    .refine((data) => Object.values(data).some((v) => v !== undefined), {
      message: 'At least one field must be provided',
    }),
});

export const deleteGoalSchema = z.object({
  params: idParam,
});

export const createTransactionSchema = z.object({
  params: idParam,
  body: z.object({
    amount: positiveNumber,
    note: z.string().max(150).optional(),
    transactionType: transactionTypes,
  }),
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
