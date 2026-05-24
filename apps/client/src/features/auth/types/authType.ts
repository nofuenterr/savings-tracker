import type { SafeUser } from '@savings-tracker/shared';

export interface LoginResponse {
  user: SafeUser;
}

export interface RegisterResponse {
  user: SafeUser;
}

export interface ForgotPasswordResponse {
  email: string;
}

export interface VerifyResetTokenResponse {
  resetToken: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  username?: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordParams {
  email: string;
}

export interface VerifyResetTokenParams {
  token: string;
}

export interface ResetPasswordParams {
  resetToken: string;
  newPassword: string;
  confirmNewPassword: string;
}
