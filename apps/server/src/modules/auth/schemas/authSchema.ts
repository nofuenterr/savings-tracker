import { z } from 'zod';

import {
  forgotPasswordBodySchema,
  loginBodySchema,
  registerBodySchema,
  resetPasswordBodySchema,
} from '@savings-tracker/shared';

export const registerSchema = z.object({
  body: registerBodySchema,
});

export const loginSchema = z.object({
  body: loginBodySchema,
});

export const forgotPasswordSchema = z.object({
  body: forgotPasswordBodySchema,
});

export const verifyResetTokenSchema = z.object({
  body: z.object({
    token: z.string().min(1, 'Password reset token is required'),
  }),
});

export const resetPasswordSchema = z.object({
  body: resetPasswordBodySchema,
});
