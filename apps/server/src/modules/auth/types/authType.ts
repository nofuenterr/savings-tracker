import z from 'zod';

import { SafeUser } from '@savings-tracker/shared';

import {
  forgotPasswordSchema,
  registerSchema,
  resetPasswordSchema,
  verifyResetTokenSchema,
} from '../schemas/authSchema';

// --- DB Rows (what comes back from postgres) ---
export interface UserIdAndPasswordHash {
  id: number;
  password_hash: string;
}

export interface UserIdAndEmail {
  id: number;
  email: string;
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

export type SafeUpdatedUser = Omit<SafeUser, 'created_at'> & {
  updated_at: Date;
};

// --- Repository Params ---
export type CreateUserParams = Pick<RegisterBody, 'username' | 'email'> & {
  passwordHash: string;
};

export interface FindUserByIdParams {
  id: number;
}

export interface FindUserByEmailParams {
  email: string;
}

export interface CreateResetTokenParams {
  userId: number;
  tokenHash: string;
  expiresAt: string;
}

export interface FindResetTokenParams {
  incomingHash: string;
}

export interface UpdatePasswordParams {
  userId: number;
  passwordHash: string;
}

// --- Service Params ---
export type RegisterUserParams = Pick<
  RegisterBody,
  'username' | 'email' | 'password'
>;

export type SendResetLinkParams = ForgotPasswordBody;

export interface FetchResetTokenParams {
  tokenRaw: string;
}

export interface EditPasswordParams {
  userId: number;
  newPassword: string;
}

// --- Controller Types (body, params, query) ---
export type VerifyResetTokenBody = z.infer<
  typeof verifyResetTokenSchema
>['body'];

export type ResetPasswordBody = z.infer<typeof resetPasswordSchema>['body'];

// --- Shared/General ---
export type RegisterBody = z.infer<typeof registerSchema>['body'];

export type ForgotPasswordBody = z.infer<typeof forgotPasswordSchema>['body'];
