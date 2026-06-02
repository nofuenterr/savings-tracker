import { useState, type SubmitEvent } from 'react';
import { useParams } from 'react-router-dom';
import { isAxiosError } from 'axios';

import type { TransactionType } from '@savings-tracker/shared';

import dollarIcon from '../../../../assets/icons/icon-dollar.svg';
import InputBlock from '../../../../components/InputBlock';
import ErrorMessage from '../../../../components/ErrorMessage';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import getFieldError from '../../../../utils/getFieldError';
import type { ErrorResponse } from '../../../../types/errorType';
import { useCreateTransaction } from '../../api/dashboardHooks';
import TransactionSelect from './TransactionSelect';

interface CreateTransactionCredentials {
  amount: number;
  note?: string;
  transactionType: TransactionType;
}

export default function TransactionForm() {
  const [transactionType, setTransactionType] =
    useState<TransactionType>('deposit');
  const [amount, setAmount] = useState<string>('0');
  const [note, setNote] = useState<string>('');

  const params = useParams();

  const createTransaction = useCreateTransaction({ id: Number(params.id) });

  const serverErrors = isAxiosError<ErrorResponse>(createTransaction.error)
    ? createTransaction.error.response?.data
    : null;

  const fieldErrors = serverErrors?.errors;

  const generalError =
    serverErrors && !fieldErrors?.length ? serverErrors.message : null;

  const transactionTypeError = getFieldError(fieldErrors, 'transactionType');
  const amountError = getFieldError(fieldErrors, 'amount');
  const noteError = getFieldError(fieldErrors, 'note');

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    createTransaction.mutate(
      {
        amount: Number(amount),
        note,
        transactionType,
      } as CreateTransactionCredentials,
      {
        onSuccess: () => {
          handleReset();
        },
      },
    );
  }

  function handleReset() {
    setAmount('0');
    setNote('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-12 grid gap-250 border border-neutral-600 bg-neutral-800 p-200 md:gap-300 md:p-300"
    >
      <h2 className="text-preset-4">Add transaction</h2>

      <div className="grid gap-250">
        <div className="grid gap-125">
          <h3>Select transaction</h3>
          <TransactionSelect
            value={transactionType}
            onValueChange={(value: TransactionType) =>
              setTransactionType(value)
            }
          />
          {transactionTypeError && (
            <ErrorMessage errorMessage={transactionTypeError} />
          )}
        </div>

        <InputBlock
          label="Amount"
          type="text"
          required={true}
          id="amount"
          name="amount"
          value={amount}
          onChange={(e) => {
            const rawValue = e.target.value;
            if (rawValue === '' || /^\d+$/.test(rawValue)) {
              setAmount(rawValue);
            }
          }}
          placeholder="0.00"
          min={1}
          inputMode="numeric"
          pattern="[0-9]*"
          className="no-spinner pl-11"
          errorMessage={amountError}
          icon={dollarIcon}
        />

        <InputBlock
          label="Note (optional)"
          type="text"
          id="note"
          name="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. Monthly savings"
          errorMessage={noteError}
        />

        {generalError && <ErrorMessage errorMessage={generalError} />}
      </div>

      <ButtonPrimary type="submit" text="Add funds" />
    </form>
  );
}
