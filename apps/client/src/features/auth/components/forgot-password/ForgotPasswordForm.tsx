import { Link } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { isAxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  forgotPasswordBodySchema,
  type ForgotPasswordBodyValues,
} from '@savings-tracker/shared';

import ButtonPrimary from '../../../../components/ButtonPrimary';
import InputBlock from '../../../../components/InputBlock';
import ErrorMessage from '../../../../components/ErrorMessage';
import getFieldError from '../../../../utils/getFieldError';
import type { ErrorResponse } from '../../../../types/errorType';
import { useForgotPassword } from '../../api/authHooks';

export default function ForgotPasswordForm() {
  const sendResetLink = useForgotPassword();

  const form = useForm<ForgotPasswordBodyValues>({
    resolver: zodResolver(forgotPasswordBodySchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
  });

  const serverErrors = isAxiosError<ErrorResponse>(sendResetLink.error)
    ? sendResetLink.error.response?.data
    : null;

  const fieldErrors = serverErrors?.errors;

  const generalError =
    serverErrors && !fieldErrors?.length ? serverErrors.message : null;

  const emailError = getFieldError(fieldErrors, 'email');

  const handleForgotPassword = async (formData: ForgotPasswordBodyValues) => {
    const finalPayload: ForgotPasswordBodyValues = {
      email: formData.email,
    };

    sendResetLink.mutate(finalPayload, { onSuccess: () => form.reset() });
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleForgotPassword)}
        className="grid gap-250"
      >
        <InputBlock
          fieldName="email"
          label="Email address"
          type="email"
          required={false}
          autoFocus={true}
          id="email"
          name="email"
          placeholder="kleinmoretti@email.com"
          maxLength={150}
          errorMessage={emailError}
        />

        {generalError && <ErrorMessage errorMessage={generalError} />}

        <ButtonPrimary
          type="submit"
          disabled={sendResetLink.isPending || !form.formState.isValid}
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
    </FormProvider>
  );
}
