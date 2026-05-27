import { Link } from 'react-router-dom';
import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import { isAxiosError } from 'axios';

import ButtonPrimary from '../../../../components/ButtonPrimary';
import { useLogin } from '../../api/authHooks';
import getFieldError from '../../utils/getFieldError';
import type { ErrorResponse } from '../../types/authType';
import Input from '../Input';
import ErrorMessage from '../ErrorMessage';

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
      <Input
        label="Email address"
        required={true}
        autoFocus={true}
        type="email"
        name="email"
        placeholder="kleinmoretti@email.com"
        value={email}
        maxLength={150}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        error={emailError}
      />

      <div className="grid gap-150">
        <Input
          label="Password"
          required={true}
          type="password"
          name="password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          error={passwordError}
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
