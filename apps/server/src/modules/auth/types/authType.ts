import z from 'zod';

import { registerSchema } from '../schemas/authSchema';

export type RegisterBody = z.infer<typeof registerSchema>['body'];

export type RegisterUserParams = Pick<
  RegisterBody,
  'username' | 'email' | 'password'
>;

export type CreateUser = Pick<RegisterBody, 'username' | 'email'> & {
  passwordHash: string;
};
