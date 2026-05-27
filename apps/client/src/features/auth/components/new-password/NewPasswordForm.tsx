import { Link, useLocation } from 'react-router-dom';
import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import { isAxiosError } from 'axios';

import ButtonPrimary from '../../../../components/ButtonPrimary';
import { useResetPassword } from '../../api/authHooks';
import getFieldError from '../../utils/getFieldError';
import type { ErrorResponse } from '../../types/authType';
import Input from '../Input';
import ErrorMessage from '../ErrorMessage';

interface NewPasswordCredentials {
  resetToken: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function NewPasswordForm() {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');

  const resetPassword = useResetPassword();

  const location = useLocation();
  const state = location.state as { resetToken?: string };
  const resetToken = state?.resetToken; // can redirect to /auth/forgot-password if resetToken doesn't exist

  const serverErrors = isAxiosError<ErrorResponse>(resetPassword.error)
    ? resetPassword.error.response?.data
    : null;

  const fieldErrors = serverErrors?.errors;

  const generalError =
    serverErrors && !fieldErrors?.length ? serverErrors.message : null;

  const newPasswordError = getFieldError(fieldErrors, 'newPassword');
  const confirmNewPasswordError = getFieldError(
    fieldErrors,
    'confirmNewPassword',
  );

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPassword.mutate({
      resetToken,
      newPassword,
      confirmNewPassword,
    } as NewPasswordCredentials);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-250">
      <Input
        label="New password"
        required={true}
        autoFocus={true}
        type="password"
        name="new-password"
        value={newPassword}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNewPassword(e.target.value)
        }
        error={newPasswordError}
      />

      <Input
        label="Confirm new password"
        required={true}
        type="password"
        name="confirm-new-password"
        value={confirmNewPassword}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setConfirmNewPassword(e.target.value)
        }
        error={confirmNewPasswordError}
      />

      {generalError && <ErrorMessage errorMessage={generalError} />}

      {!resetToken && (
        <ErrorMessage errorMessage="Password reset token is missing" />
      )}

      <ButtonPrimary
        type="submit"
        disabled={
          resetPassword.isPending ||
          !(newPassword && confirmNewPassword && !!resetToken)
        }
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
  );
}
