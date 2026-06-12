import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { isAxiosError } from 'axios';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  transactionTypes,
  type CreateTransactionBody,
} from '@savings-tracker/shared';

import dollarIcon from '../../../../assets/icons/icon-dollar.svg';
import InputBlock from '../../../../components/InputBlock';
import ErrorMessage from '../../../../components/ErrorMessage';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import getFieldError from '../../../../utils/getFieldError';
import type { ErrorResponse } from '../../../../types/errorType';
import { useCreateTransaction } from '../../api/dashboardHooks';
import TransactionSelect from './TransactionSelect';

const createTransactionFormSchema = z.object({
  transactionType: transactionTypes,
  amount: z.string().refine((val) => !val || Number(val) > 0, {
    message: 'Transaction amount must be greater than 0',
  }),
  note: z.string().max(150).optional(),
});

type CreateTransactionFormValues = z.infer<typeof createTransactionFormSchema>;

export default function TransactionForm() {
  const params = useParams();

  const createTransaction = useCreateTransaction({ id: Number(params.id) });

  const form = useForm<CreateTransactionFormValues>({
    resolver: zodResolver(createTransactionFormSchema),
    mode: 'onBlur',
    defaultValues: { transactionType: 'deposit', amount: '', note: '' },
  });

  const serverErrors = isAxiosError<ErrorResponse>(createTransaction.error)
    ? createTransaction.error.response?.data
    : null;

  const fieldErrors = serverErrors?.errors;

  const generalError =
    serverErrors && !fieldErrors?.length ? serverErrors.message : null;

  const transactionTypeError = getFieldError(fieldErrors, 'transactionType');
  const amountError = getFieldError(fieldErrors, 'amount');
  const noteError = getFieldError(fieldErrors, 'note');

  const handleCreateTransaction = async (
    formData: CreateTransactionFormValues,
  ) => {
    const finalPayload: CreateTransactionBody = {
      amount: Number(formData.amount),
      note: formData.note ? formData.note : undefined,
      transactionType: formData.transactionType,
    };

    createTransaction.mutate(finalPayload, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateTransaction)}
        className="rounded-12 grid gap-250 border border-neutral-600 bg-neutral-800 p-200 md:gap-300 md:p-300"
      >
        <h2 className="text-preset-4">Add transaction</h2>

        <div className="grid gap-250">
          <div className="grid gap-125">
            <h3>Select transaction</h3>
            <TransactionSelect fieldName="transactionType" />
            {transactionTypeError && (
              <ErrorMessage errorMessage={transactionTypeError} />
            )}
          </div>

          <InputBlock
            fieldName="amount"
            label="Amount"
            type="text"
            required={true}
            id="amount"
            name="amount"
            placeholder="0.00"
            min={1}
            inputMode="numeric"
            pattern="[0-9]*"
            className="no-spinner pl-11"
            errorMessage={amountError}
            icon={dollarIcon}
          />

          <InputBlock
            fieldName="note"
            label="Note (optional)"
            type="text"
            id="note"
            name="note"
            placeholder="e.g. Monthly savings"
            errorMessage={noteError}
          />

          {generalError && <ErrorMessage errorMessage={generalError} />}
        </div>

        <ButtonPrimary
          type="submit"
          text={
            createTransaction.isPending
              ? 'Creating transaction...'
              : 'Create transaction'
          }
          disabled={createTransaction.isPending || !form.formState.isValid}
        />
      </form>
    </FormProvider>
  );
}
