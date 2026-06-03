import { z } from 'zod';

export const registerSchema = z.object({
  body: z
    .object({
      username: z
        .string()
        .min(3, 'Username must be at least 3 characters long')
        .max(30, 'Username must not exceed 30 characters')
        .optional(),
      email: z.email('Invalid email address'),
      password: z
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .regex(/[a-z]/, {
          message: 'Password must contain at least one lowercase letter',
        })
        .regex(/[A-Z]/, {
          message: 'Password must contain at least one uppercase letter',
        })
        .regex(/[0-9]/, {
          message: 'Password must contain at least one number',
        })
        .regex(/[^a-zA-Z0-9]/, {
          message: 'Password must contain at least one special character',
        }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.email('Invalid email address').min(1, 'Email is required'),
  }),
});

export const verifyResetTokenSchema = z.object({
  body: z.object({
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
