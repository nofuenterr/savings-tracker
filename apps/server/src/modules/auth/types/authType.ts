import z from 'zod';

import { SafeUser } from '../../../types/userType';
import {
  forgotPasswordSchema,
  registerSchema,
  resetPasswordSchema,
  verifyResetTokenSchema,
} from '../schemas/authSchema';

export type RegisterBody = z.infer<typeof registerSchema>['body'];

export type ForgotPasswordBody = z.infer<typeof forgotPasswordSchema>['body'];

export type VerifyResetTokenBody = z.infer<
  typeof verifyResetTokenSchema
>['body'];

export type ResetPasswordBody = z.infer<typeof resetPasswordSchema>['body'];

export type RegisterUserParams = Pick<
  RegisterBody,
  'username' | 'email' | 'password'
>;

export type SendResetLinkParams = ForgotPasswordBody;

export interface FetchResetTokenParams {
  tokenRaw: string;
}

export type CreateUserParams = Pick<RegisterBody, 'username' | 'email'> & {
  passwordHash: string;
};

export interface EditPasswordParams {
  userId: number;
  newPassword: string;
}

export interface UserIdAndEmail {
  id: number;
  email: string;
}

export interface CreateResetTokenParams {
  userId: number;
  tokenHash: string;
  expiresAt: string;
}

interface ResetToken {
  id: number;
  user_id: number;
  token_hash: string;
  expires_at: Date;
  used_at: Date | null;
  created_at: Date;
}

export type NewResetTokenRow = Pick<
  ResetToken,
  'id' | 'expires_at' | 'created_at'
>;

export type ValidResetTokenRow = Pick<ResetToken, 'id' | 'user_id'> & {
  used_at: null;
};

export interface UpdatePasswordParams {
  userId: number;
  passwordHash: string;
}

export type SafeUpdatedUser = Omit<SafeUser, 'created_at'> & {
  updated_at: Date;
};
