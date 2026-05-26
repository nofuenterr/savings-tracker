import { Link } from 'react-router-dom';
import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import { isAxiosError } from 'axios';

import errorIcon from '../../../../assets/icons/icon-error.svg';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import { useLogin } from '../../api/authHooks';
import Input from '../Input';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginErrorResponse {
  message: string;
}

export default function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const login = useLogin();

  const errorMessage = isAxiosError<LoginErrorResponse>(login.error)
    ? login.error.response?.data?.message
    : null;

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    login.mutate({ email, password } as LoginCredentials);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-250">
      <Input
        label="Email address"
        required={true}
        type="email"
        name="email"
        placeholder="kleinmoretti@email.com"
        value={email}
        maxLength={150}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
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
        />
        <Link
          className="text-preset-5 justify-self-end rounded-full text-neutral-300 hover:opacity-90"
          to="/auth/forgot-password"
        >
          Forgot password?
        </Link>
      </div>

      {errorMessage && (
        <p className="flex items-center gap-100 text-red-500">
          {errorIcon && <img src={errorIcon} alt="" />}
          <span>{errorMessage}</span>
        </p>
      )}

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
