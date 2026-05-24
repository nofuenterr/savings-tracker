import type { DataResponse, MessageResponse } from '../../../shared/types/api';
import api from '../../../lib/axios';
import type {
  ForgotPasswordParams,
  ForgotPasswordResponse,
  LoginParams,
  LoginResponse,
  RegisterParams,
  RegisterResponse,
  ResetPasswordParams,
  VerifyResetTokenParams,
  VerifyResetTokenResponse,
} from '../types/authType';

export const login = async (payload: LoginParams) => {
  const { data } = await api.post<DataResponse<LoginResponse>>(
    '/auth/login',
    payload,
  );

  return data.data;
};

export const register = async (payload: RegisterParams) => {
  const { data } = await api.post<DataResponse<RegisterResponse>>(
    '/auth/register',
    payload,
  );

  return data.data;
};

export const logout = async () => {
  const { data } = await api.post<MessageResponse>('/auth/logout');

  return data.message;
};

export const forgotPassword = async (payload: ForgotPasswordParams) => {
  const { data } = await api.post<DataResponse<ForgotPasswordResponse>>(
    '/auth/forgot-password',
    payload,
  );

  return data.data;
};

export const verifyResetToken = async ({ token }: VerifyResetTokenParams) => {
  const { data } = await api.post<DataResponse<VerifyResetTokenResponse>>(
    '/auth/verify-reset-token',
    { token },
  );

  return data.data;
};

export const resetPassword = async (payload: ResetPasswordParams) => {
  const { data } = await api.post<MessageResponse>(
    '/auth/reset-password',
    payload,
  );

  return data.message;
};
