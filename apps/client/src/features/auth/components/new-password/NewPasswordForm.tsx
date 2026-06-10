import { Link, useLocation } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { isAxiosError } from 'axios';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Password,
  type ResetPasswordBodyValues,
} from '@savings-tracker/shared';

import ButtonPrimary from '../../../../components/ButtonPrimary';
import InputBlock from '../../../../components/InputBlock';
import ErrorMessage from '../../../../components/ErrorMessage';
import getFieldError from '../../../../utils/getFieldError';
import getAllFieldErrors from '../../../../utils/getAllFieldErrors';
import type { ErrorResponse } from '../../../../types/errorType';
import { useResetPassword } from '../../api/authHooks';
import getPasswordErrors from '../../utils/getPasswordErrors';

export const newPasswordFormSchema = z
  .object({
    newPassword: Password,
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });

type NewPasswordFormValues = z.infer<typeof newPasswordFormSchema>;

export default function NewPasswordForm() {
  const resetPassword = useResetPassword();

  const form = useForm<NewPasswordFormValues>({
    resolver: zodResolver(newPasswordFormSchema),
    mode: 'onBlur',
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const location = useLocation();
  const state = location.state as { resetToken?: string };
  const resetToken = state?.resetToken; // can redirect to /auth/forgot-password if resetToken doesn't exist

  const passwordValue = form.watch('newPassword') || '';
  const clientPasswordErrors = getPasswordErrors(passwordValue);

  const serverErrors = isAxiosError<ErrorResponse>(resetPassword.error)
    ? resetPassword.error.response?.data
    : null;

  const fieldErrors = serverErrors?.errors;

  const generalError =
    serverErrors && !fieldErrors?.length ? serverErrors.message : null;

  const newPasswordErrors = getAllFieldErrors(fieldErrors, 'newPassword');
  const confirmNewPasswordError = getFieldError(
    fieldErrors,
    'confirmNewPassword',
  );

  const handleNewPassword = async (formData: NewPasswordFormValues) => {
    const finalPayload: ResetPasswordBodyValues = {
      resetToken: resetToken || '',
      newPassword: formData.newPassword,
      confirmNewPassword: formData.confirmNewPassword,
    };

    resetPassword.mutate(finalPayload, { onSuccess: () => form.reset() });
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleNewPassword)}
        className="grid gap-250"
      >
        <InputBlock
          fieldName="newPassword"
          label="New password"
          type="password"
          required={true}
          id="new-password"
          name="new-password"
          errorMessages={newPasswordErrors || clientPasswordErrors}
        />

        <InputBlock
          fieldName="confirmNewPassword"
          label="Confirm new password"
          type="password"
          required={true}
          id="confirm-new-password"
          name="confirm-new-password"
          errorMessage={confirmNewPasswordError}
        />

        {generalError && <ErrorMessage errorMessage={generalError} />}

        {!resetToken && (
          <ErrorMessage errorMessage="Password reset token is missing" />
        )}

        <ButtonPrimary
          type="submit"
          disabled={resetPassword.isPending || !form.formState.isValid}
          text={
            resetPassword.isPending ? 'Resetting password...' : 'Reset password'
          }
        />

        <Link
          className="text-preset-5 rounded-full text-center underline hover:opacity-90"
          to="/auth/login"
        >
          Back to sign in
        </Link>
      </form>
    </FormProvider>
  );
}
