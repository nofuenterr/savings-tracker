import { Link } from 'react-router-dom';
import { useState, type SubmitEvent } from 'react';
import { isAxiosError } from 'axios';

import ButtonPrimary from '../../../../components/ButtonPrimary';
import InputBlock from '../../../../components/InputBlock';
import ErrorMessage from '../../../../components/ErrorMessage';
import getFieldError from '../../../../utils/getFieldError';
import type { ErrorResponse } from '../../../../types/errorType';
import { useForgotPassword } from '../../api/authHooks';

interface ForgotPasswordCredentials {
  email: string;
}

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState<string>('');

  const sendResetLink = useForgotPassword();

  const serverErrors = isAxiosError<ErrorResponse>(sendResetLink.error)
    ? sendResetLink.error.response?.data
    : null;

  const fieldErrors = serverErrors?.errors;

  const generalError =
    serverErrors && !fieldErrors?.length ? serverErrors.message : null;

  const emailError = getFieldError(fieldErrors, 'email');

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendResetLink.mutate({ email } as ForgotPasswordCredentials);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-250">
      <InputBlock
        label="Email address"
        type="email"
        required={false}
        autoFocus={true}
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="kleinmoretti@email.com"
        maxLength={150}
        errorMessage={emailError}
      />

      {generalError && <ErrorMessage errorMessage={generalError} />}

      <ButtonPrimary
        type="submit"
        disabled={sendResetLink.isPending || !email}
        text={
          sendResetLink.isPending
            ? 'Sending reset link to email...'
            : 'Send reset link'
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
