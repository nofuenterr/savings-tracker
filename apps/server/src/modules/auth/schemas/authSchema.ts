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
