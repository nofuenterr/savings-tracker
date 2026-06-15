import { Link } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { isAxiosError } from 'axios';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Password, type RegisterBodyValues } from '@savings-tracker/shared';

import ButtonPrimary from '../../../../components/ButtonPrimary';
import InputBlock from '../../../../components/InputBlock';
import ErrorMessage from '../../../../components/ErrorMessage';
import getFieldError from '../../../../utils/getFieldError';
import getAllFieldErrors from '../../../../utils/getAllFieldErrors';
import type { ErrorResponse } from '../../../../types/errorType';
import { useRegister } from '../../api/authHooks';
import getPasswordErrors from '../../utils/getPasswordErrors';

export const registerFormSchema = z
  .object({
    username: z
      .string()
      .optional()
      .refine((val) => !val || (val.length >= 3 && val.length <= 30), {
        message: 'Username must be between 3 and 30 characters long',
      }),
    email: z.email('Invalid email address'),
    password: Password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export default function RegisterForm() {
  const register = useRegister();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const passwordValue = form.watch('password') || '';
  const clientPasswordErrors = getPasswordErrors(passwordValue);

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

  const handleRegister = async (formData: RegisterFormValues) => {
    const finalPayload: RegisterBodyValues = {
      username: formData.username ? formData.username : undefined,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    register.mutate(finalPayload, { onSuccess: () => form.reset() });
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleRegister)}
        className="grid gap-250"
      >
        <InputBlock
          fieldName="username"
          label="Username"
          type="text"
          required={false}
          id="username"
          name="username"
          placeholder="kmoretti"
          maxLength={30}
          errorMessage={usernameError}
        />

        <InputBlock
          fieldName="email"
          label="Email address"
          type="email"
          required={true}
          id="email"
          name="email"
          placeholder="kleinmoretti@email.com"
          maxLength={150}
          errorMessage={emailError}
        />

        <InputBlock
          fieldName="password"
          label="Password"
          type="password"
          required={true}
          id="password"
          name="password"
          errorMessages={passwordErrors || clientPasswordErrors}
        />

        <InputBlock
          fieldName="confirmPassword"
          label="Confirm password"
          type="password"
          required={true}
          id="confirm-password"
          name="confirm-password"
          errorMessage={confirmPasswordServerError}
        />

        {generalError && <ErrorMessage errorMessage={generalError} />}

        <ButtonPrimary
          type="submit"
          disabled={register.isPending}
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
    </FormProvider>
  );
}
