import z from 'zod';

import { SafeUser } from '../../../types/userType';
import { registerSchema } from '../schemas/authSchema';

export type RegisterBody = z.infer<typeof registerSchema>['body'];

export type RegisterUserParams = Pick<
  RegisterBody,
  'username' | 'email' | 'password'
>;

export type CreateUserParams = Pick<RegisterBody, 'username' | 'email'> & {
  passwordHash: string;
};

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

export interface SendResetLinkDTO {
  token: NewResetTokenRow;
  user: UserIdAndEmail;
  tokenRaw: string;
}

export type ValidResetTokenRow = Pick<ResetToken, 'id' | 'user_id'> & {
  used_at: null;
};

export interface ResetPasswordBody {
  resetToken: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface EditPasswordParams {
  userId: number;
  newPassword: string;
}

export interface UpdatePasswordParams {
  userId: number;
  passwordHash: string;
}

export type SafeUpdatedUser = Omit<SafeUser, 'created_at'> & {
  updated_at: Date;
};
