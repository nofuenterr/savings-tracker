import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast'

import {
  login,
  register,
  logout,
  forgotPassword,
  resetPassword,
  verifyResetToken,
  getCurrentUser,
} from './authApi';

export function useGetCurrentUser(options?: Partial<UseQueryOptions<any>>) {
  return useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: Infinity,
    ...options,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: ({ user }) => {
      queryClient.setQueryData(['user'], user);
      navigate('/dashboard');
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onSuccess: ({ user }) => {
      // toast.success('Account created successfully')
      queryClient.setQueryData(['user'], user);
      navigate('/dashboard');
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      navigate('/auth/login');
    },
  });
}

export function useForgotPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (_, { email }) => {
      navigate('/auth/email-sent', { state: { email } });
    },
    onError: () => {
      // toast.success('An error has occured while sending the email')
      navigate('/auth/forgot-password');
    },
  });
}

export function useVerifyResetToken() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: verifyResetToken,
    onSuccess: ({ resetToken }) => {
      navigate('/auth/reset-password', { state: { resetToken } });
    },
    onError: () => {
      // toast.success('Reset token is not valid or has expired')
      navigate('/auth/forgot-password');
    },
  });
}

export function useResetPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      // toast.success('Password reset successfully')
      navigate('/auth/reset-password-success');
    },
  });
}
