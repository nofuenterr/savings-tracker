import { z } from 'zod';

export const futureDate = z
  .preprocess((val) => (val === '' ? undefined : val), z.string().optional())
  .transform((val) => {
    if (!val) return undefined;
    let date = new Date(val);
    if (isNaN(date.getTime()) && val.includes('-')) {
      const [year, month, day] = val.split('-').map(Number);
      date = new Date(year, month - 1, day);
    }
    return date;
  })
  .refine(
    (date) => {
      if (date === undefined) return true;
      if (isNaN(date.getTime())) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    },
    {
      message: 'Deadline must be in the future',
    },
  );

export const goalNameValue = z
  .string()
  .min(3, 'Goal name must be at least 3 characters')
  .max(30, 'Goal name must not exceed 30 characters');

export const createGoalBodySchema = z.object({
  goalName: goalNameValue,
  goalTarget: z.coerce
    .number()
    .positive('Target amount must be greater than 0'),
  deadline: futureDate.optional(),
});

export type CreateGoalBody = z.infer<typeof createGoalBodySchema>;

export const transactionTypes = z.enum(['deposit', 'withdrawal']);

export const createTransactionBodySchema = z.object({
  amount: z.coerce
    .number()
    .positive('Transaction amount must be greater than 0'),
  note: z.string().max(150).optional(),
  transactionType: transactionTypes,
});

export type CreateTransactionBody = z.infer<typeof createTransactionBodySchema>;

export const updateGoalBodySchema = z
  .object({
    goalName: goalNameValue,
    goalTarget: z.coerce
      .number()
      .positive('Target amount must be greater than 0'),
    deadline: z.coerce.date().optional(),
  })
  .refine((data) => Object.values(data).some((v) => v !== undefined), {
    message: 'At least one field must be provided',
  });

export type UpdateGoalBody = z.infer<typeof updateGoalBodySchema>;
