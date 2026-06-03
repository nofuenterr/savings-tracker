import { Link } from 'react-router-dom';
import { useState, type SubmitEvent } from 'react';
import { isAxiosError } from 'axios';

import ButtonPrimary from '../../../../components/ButtonPrimary';
import InputBlock from '../../../../components/InputBlock';
import ErrorMessage from '../../../../components/ErrorMessage';
import getFieldError from '../../../../utils/getFieldError';
import type { ErrorResponse } from '../../../../types/errorType';
import { useRegister } from '../../api/authHooks';
import getAllFieldErrors from '../../../../utils/getAllFieldErrors';

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
  const passwordErrors = getAllFieldErrors(fieldErrors, 'password');
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
      <InputBlock
        label="Username"
        type="text"
        required={false}
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="kmoretti"
        maxLength={30}
        errorMessage={usernameError}
      />

      <InputBlock
        label="Email address"
        type="email"
        required={true}
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="kleinmoretti@email.com"
        maxLength={150}
        errorMessage={emailError}
      />

      <InputBlock
        label="Password"
        type="password"
        required={true}
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        errorMessages={passwordErrors}
      />

      <InputBlock
        label="Confirm password"
        type="password"
        required={true}
        id="confirm-password"
        name="confirm-password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          setConfirmPasswordError(null);
        }}
        errorMessage={confirmPasswordError ?? confirmPasswordServerError}
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
