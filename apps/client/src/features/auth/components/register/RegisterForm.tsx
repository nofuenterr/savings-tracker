import { Link } from 'react-router-dom';
import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import { isAxiosError } from 'axios';

import ButtonPrimary from '../../../../components/ButtonPrimary';
import { useRegister } from '../../api/authHooks';
import getFieldError from '../../utils/getFieldError';
import type { ErrorResponse } from '../../types/authType';
import Input from '../Input';
import ErrorMessage from '../ErrorMessage';

interface RegisterCredentials {
  username?: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  const register = useRegister();

  const serverErrors = isAxiosError<ErrorResponse>(register.error)
    ? register.error.response?.data
    : null;

  const fieldErrors = serverErrors?.errors;

  const generalError =
    serverErrors && !fieldErrors?.length ? serverErrors.message : null;

  const usernameError = getFieldError(fieldErrors, 'username');
  const emailError = getFieldError(fieldErrors, 'email');
  const passwordError = getFieldError(fieldErrors, 'password');
  const confirmPasswordServerError = getFieldError(
    fieldErrors,
    'confirmPassword',
  );

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    setConfirmPasswordError(null);

    register.mutate({
      username: username || undefined,
      email,
      password,
      confirmPassword,
    } as RegisterCredentials);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-250">
      <Input
        label="Username"
        type="text"
        name="username"
        placeholder="kmoretti"
        value={username}
        maxLength={30}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
        error={usernameError}
      />

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
        error={emailError}
      />

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

      <Input
        label="Confirm password"
        required={true}
        type="password"
        name="confirm-password"
        value={confirmPassword}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setConfirmPassword(e.target.value);
          setConfirmPasswordError(null);
        }}
        error={confirmPasswordError ?? confirmPasswordServerError}
      />

      {generalError && <ErrorMessage errorMessage={generalError} />}

      <ButtonPrimary
        type="submit"
        disabled={
          register.isPending ||
          !(email && password && confirmPassword && !confirmPasswordError)
        }
        text={register.isPending ? 'Signing up...' : 'Create account'}
      />

      <p className="text-preset-5 text-center">
        <span className="text-neutral-300">Already have an account?</span>{' '}
        <Link
          className="rounded-full underline hover:opacity-90"
          to="/auth/login"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
