import { z } from 'zod';

export const registerSchema = z.object({
  body: z
    .object({
      username: z.string().min(3).max(30).optional(),
      email: z.email(),
      password: z.string().min(8),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(1, 'Password is required'),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.email().min(1, 'Email is required'),
  }),
});

export const verifyResetTokenSchema = z.object({
  query: z.object({
    token: z.string().min(1, 'Password reset token is required'),
  }),
});

export const resetPasswordSchema = z.object({
  body: z
    .object({
      resetToken: z.string().min(1, 'Reset token is required'),
      newPassword: z.string().min(8),
      confirmNewPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: 'Passwords do not match',
      path: ['confirmNewPassword'],
    }),
});
