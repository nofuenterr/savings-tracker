import { z } from 'zod';

const Email = z.email('Invalid email address');

export const loginBodySchema = z.object({
  email: Email,
  password: z.string().min(1, 'Password is required'),
});

export type LoginBodyValues = z.infer<typeof loginBodySchema>;

export const Password = z
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
  });

export const registerBodySchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters long')
      .max(30, 'Username must not exceed 30 characters')
      .optional(),
    email: Email,
    password: Password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterBodyValues = z.infer<typeof registerBodySchema>;

export const forgotPasswordBodySchema = z.object({
  email: Email.min(1, 'Email is required'),
});

export type ForgotPasswordBodyValues = z.infer<typeof forgotPasswordBodySchema>;

export const resetPasswordBodySchema = z
  .object({
    resetToken: z.string().min(1, 'Reset token is required'),
    newPassword: Password,
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });

export type ResetPasswordBodyValues = z.infer<typeof resetPasswordBodySchema>;
