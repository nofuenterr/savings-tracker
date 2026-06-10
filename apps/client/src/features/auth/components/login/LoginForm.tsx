import { Link } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { isAxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginBodySchema, type LoginBodyValues } from '@savings-tracker/shared';

import ButtonPrimary from '../../../../components/ButtonPrimary';
import InputBlock from '../../../../components/InputBlock';
import ErrorMessage from '../../../../components/ErrorMessage';
import getFieldError from '../../../../utils/getFieldError';
import type { ErrorResponse } from '../../../../types/errorType';
import { useLogin } from '../../api/authHooks';

export default function LoginForm() {
  const login = useLogin();

  const form = useForm<LoginBodyValues>({
    resolver: zodResolver(loginBodySchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const serverErrors = isAxiosError<ErrorResponse>(login.error)
    ? login.error.response?.data
    : null;

  const fieldErrors = serverErrors?.errors;

  const generalError =
    serverErrors && !fieldErrors?.length ? serverErrors.message : null;

  const emailError = getFieldError(fieldErrors, 'email');
  const passwordError = getFieldError(fieldErrors, 'password');

  const handleLogin = async (formData: LoginBodyValues) => {
    const finalPayload: LoginBodyValues = {
      email: formData.email,
      password: formData.password,
    };

    login.mutate(finalPayload);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="grid gap-250">
        <InputBlock
          fieldName="email"
          label="Email address"
          type="email"
          required={true}
          autoFocus={true}
          id="email"
          name="email"
          placeholder="kleinmoretti@email.com"
          maxLength={150}
          errorMessage={emailError}
        />

        <div className="grid gap-150">
          <InputBlock
            fieldName="password"
            label="Password"
            type="password"
            required={true}
            id="password"
            name="password"
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
          disabled={login.isPending || !form.formState.isValid}
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
    </FormProvider>
  );
}
