import { Link } from 'react-router-dom';
import { useState, type SubmitEvent } from 'react';
import { isAxiosError } from 'axios';

import ButtonPrimary from '../../../../components/ButtonPrimary';
import InputBlock from '../../../../components/InputBlock';
import ErrorMessage from '../../../../components/ErrorMessage';
import getFieldError from '../../../../utils/getFieldError';
import type { ErrorResponse } from '../../../../types/errorType';
import { useLogin } from '../../api/authHooks';

interface LoginCredentials {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const login = useLogin();

  const serverErrors = isAxiosError<ErrorResponse>(login.error)
    ? login.error.response?.data
    : null;

  const fieldErrors = serverErrors?.errors;

  const generalError =
    serverErrors && !fieldErrors?.length ? serverErrors.message : null;

  const emailError = getFieldError(fieldErrors, 'email');
  const passwordError = getFieldError(fieldErrors, 'password');

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    login.mutate({ email, password } as LoginCredentials);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-250">
      <InputBlock
        label="Email address"
        type="email"
        required={true}
        autoFocus={true}
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="kleinmoretti@email.com"
        maxLength={150}
        errorMessage={emailError}
      />

      <div className="grid gap-150">
        <InputBlock
          label="Password"
          type="password"
          required={true}
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          errorMessage={passwordError}
        />
        <Link
          className="text-preset-5 justify-self-end rounded-full text-neutral-300 hover:opacity-90"
          to="/auth/forgot-password"
        >
          Forgot password?
        </Link>
      </div>

      {generalError && <ErrorMessage errorMessage={generalError} />}

      <ButtonPrimary
        type="submit"
        disabled={login.isPending || !(email && password)}
        text={login.isPending ? 'Signing in...' : 'Sign in'}
      />

      <p className="text-preset-5 text-center">
        <span className="text-neutral-300">Don't have an account?</span>{' '}
        <Link
          className="rounded-full underline hover:opacity-90"
          to="/auth/register"
        >
          Create one
        </Link>
      </p>
    </form>
  );
}
