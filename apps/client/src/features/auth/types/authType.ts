import type {
  ForgotPasswordBodyValues,
  LoginBodyValues,
  RegisterBodyValues,
  ResetPasswordBodyValues,
  SafeUser,
} from '@savings-tracker/shared';

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

export type LoginParams = LoginBodyValues;

export type RegisterParams = RegisterBodyValues;

export type ForgotPasswordParams = ForgotPasswordBodyValues;

export interface VerifyResetTokenParams {
  token: string;
}

export type ResetPasswordParams = ResetPasswordBodyValues;
