import { Link, useLocation } from 'react-router-dom';
import { useState, type SubmitEvent } from 'react';
import { isAxiosError } from 'axios';

import ButtonPrimary from '../../../../components/ButtonPrimary';
import InputBlock from '../../../../components/InputBlock';
import ErrorMessage from '../../../../components/ErrorMessage';
import getFieldError from '../../../../utils/getFieldError';
import type { ErrorResponse } from '../../../../types/errorType';
import { useResetPassword } from '../../api/authHooks';

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
      <InputBlock
        label="New password"
        type="password"
        required={true}
        id="new-password"
        name="new-password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        errorMessage={newPasswordError}
      />

      <InputBlock
        label="Confirm new password"
        type="password"
        required={true}
        id="confirm-new-password"
        name="confirm-new-password"
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        errorMessage={confirmNewPasswordError}
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
