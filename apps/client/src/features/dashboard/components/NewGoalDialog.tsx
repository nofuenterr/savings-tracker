import { type ReactNode } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { isAxiosError } from 'axios';
import { Dialog } from 'radix-ui';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { type CreateGoalBody } from '@savings-tracker/shared';

import crossIcon from '../../../assets/icons/icon-cross.svg';
import dollarIcon from '../../../assets/icons/icon-dollar.svg';
import InputBlock from '../../../components/InputBlock';
import ErrorMessage from '../../../components/ErrorMessage';
import ButtonPrimary from '../../../components/ButtonPrimary';
import ButtonSecondary from '../../../components/ButtonSecondary';
import getFieldError from '../../../utils/getFieldError';
import type { ErrorResponse } from '../../../types/errorType';
import { useCreateGoal } from '../api/dashboardHooks';

interface NewGoalDialogProps {
  newGoalActive: boolean;
  onClose: () => void;
  children: ReactNode;
}

const newGoalFormSchema = z.object({
  goalName: z
    .string()
    .min(3, 'Goal name must be at least 3 characters')
    .max(30, 'Goal name must not exceed 30 characters'),
  goalTarget: z.string().refine((val) => !val || Number(val) > 0, {
    message: 'Target amount must be greater than 0',
  }),
  deadline: z.string().optional(),
});

type NewGoalFormValues = z.infer<typeof newGoalFormSchema>;

export default function NewGoalDialog({
  newGoalActive,
  onClose,
  children,
}: NewGoalDialogProps) {
  const createGoal = useCreateGoal();

  const form = useForm<NewGoalFormValues>({
    resolver: zodResolver(newGoalFormSchema),
    mode: 'onBlur',
    defaultValues: {
      goalName: '',
      goalTarget: '',
      deadline: '',
    },
  });

  const serverErrors = isAxiosError<ErrorResponse>(createGoal.error)
    ? createGoal.error.response?.data
    : null;

  const fieldErrors = serverErrors?.errors;

  const generalError =
    serverErrors && !fieldErrors?.length ? serverErrors.message : null;

  const goalNameError = getFieldError(fieldErrors, 'goalName');
  const goalTargetError = getFieldError(fieldErrors, 'goalTarget');
  const deadlineError = getFieldError(fieldErrors, 'deadline');

  const handleCreateGoal = async (formData: NewGoalFormValues) => {
    const finalPayload: CreateGoalBody = {
      goalName: formData.goalName,
      goalTarget: Number(formData.goalTarget),
      deadline: formData.deadline ? new Date(formData.deadline) : undefined,
    };

    createGoal.mutate(finalPayload, {
      onSuccess: () => {
        onClose();
        form.reset();
      },
    });
  };

  return (
    <FormProvider {...form}>
      <Dialog.Root
        open={newGoalActive}
        onOpenChange={(open) => !open && onClose()}
      >
        <Dialog.Trigger asChild>{children}</Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-100 grid content-start overflow-y-auto bg-neutral-900/90 duration-150" />

          <Dialog.Content className="rounded-16 fixed top-1/2 left-1/2 z-100 grid max-h-[85vh] w-9/10 max-w-170 -translate-1/2 gap-300 border border-neutral-600 bg-neutral-800 px-200 py-250 duration-150 focus:outline-none md:p-400">
            <Dialog.Title className="text-preset-4">New goal</Dialog.Title>

            <hr className="h-px w-full text-neutral-700" />

            <form
              onSubmit={form.handleSubmit(handleCreateGoal)}
              className="grid gap-300"
            >
              <fieldset className="grid min-h-0 flex-1 gap-250">
                <InputBlock
                  fieldName="goalName"
                  label="Goal name"
                  type="text"
                  required={true}
                  autoFocus={true}
                  id="goal_name"
                  name="goal_name"
                  placeholder="e.g. MacBook Pro M4"
                  maxLength={150}
                  errorMessage={goalNameError}
                />
                <InputBlock
                  fieldName="goalTarget"
                  label="Target amount"
                  type="text"
                  required={true}
                  id="goal_target"
                  name="goal_target"
                  placeholder="0.00"
                  min={1}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="no-spinner pl-11"
                  errorMessage={goalTargetError}
                  icon={dollarIcon}
                />
                <InputBlock
                  fieldName="deadline"
                  label="Deadline (optional)"
                  type="date"
                  id="deadline"
                  name="deadline"
                  errorMessage={deadlineError}
                />
                {generalError && <ErrorMessage errorMessage={generalError} />}
              </fieldset>

              <div className="flex items-center justify-end gap-200">
                <Dialog.Close asChild>
                  <ButtonSecondary
                    type="button"
                    text="Cancel"
                    ariaLabel="Cancel"
                  />
                </Dialog.Close>

                <ButtonPrimary
                  disabled={createGoal.isPending || !form.formState.isValid}
                  type="submit"
                  text={
                    createGoal.isPending ? 'Creating goal...' : 'Create goal'
                  }
                  ariaLabel="Create goal"
                />
              </div>
            </form>

            <Dialog.Close asChild>
              <button className="p-075 absolute top-250 right-250 cursor-pointer rounded-full bg-transparent text-neutral-400 hover:bg-neutral-600">
                <img src={crossIcon} alt="X" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </FormProvider>
  );
}
