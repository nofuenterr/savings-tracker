import { type ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { isAxiosError } from 'axios';
import { Dialog } from 'radix-ui';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { type UpdateGoalBody } from '@savings-tracker/shared';

import crossIcon from '../../../../assets/icons/icon-cross.svg';
import dollarIcon from '../../../../assets/icons/icon-dollar.svg';
import InputBlock from '../../../../components/InputBlock';
import ErrorMessage from '../../../../components/ErrorMessage';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import ButtonSecondary from '../../../../components/ButtonSecondary';
import getFieldError from '../../../../utils/getFieldError';
import type { ErrorResponse } from '../../../../types/errorType';
import { useUpdateGoal } from '../../api/dashboardHooks';
import type { GetGoalResponse } from '../../types/dashboardType';

interface EditGoalDialogProps {
  goal: GetGoalResponse['goal'];
  editGoalActive: boolean;
  onClose: () => void;
  children: ReactNode;
}

const editGoalFormSchema = z.object({
  goalName: z
    .string()
    .min(3, 'Goal name must be at least 3 characters')
    .max(30, 'Goal name must not exceed 30 characters'),
  goalTarget: z.string().refine((val) => !val || Number(val) > 0, {
    message: 'Target amount must be greater than 0',
  }),
  deadline: z.string().optional(),
});

type EditGoalFormValues = z.infer<typeof editGoalFormSchema>;

export default function EditGoalDialog({
  goal,
  editGoalActive,
  onClose,
  children,
}: EditGoalDialogProps) {
  const updateGoal = useUpdateGoal();

  const currentDeadline = goal.deadline
    ? new Date(goal.deadline).toISOString().slice(0, 10)
    : '';

  const form = useForm<EditGoalFormValues>({
    resolver: zodResolver(editGoalFormSchema),
    mode: 'onBlur',
    values: {
      goalName: goal.goal_name || '',
      goalTarget: goal.goal_target ? String(goal.goal_target) : '',
      deadline: currentDeadline,
    },
  });

  const serverErrors = isAxiosError<ErrorResponse>(updateGoal.error)
    ? updateGoal.error.response?.data
    : null;

  const fieldErrors = serverErrors?.errors;

  const generalError =
    serverErrors && !fieldErrors?.length ? serverErrors.message : null;

  const goalNameError = getFieldError(fieldErrors, 'goalName');
  const goalTargetError = getFieldError(fieldErrors, 'goalTarget');
  const deadlineError = getFieldError(fieldErrors, 'deadline');

  const handleUpdateGoal = async (formData: EditGoalFormValues) => {
    const finalPayload: UpdateGoalBody = {
      goalName: formData.goalName,
      goalTarget: Number(formData.goalTarget),
      deadline: formData.deadline ? new Date(formData.deadline) : undefined,
    };

    updateGoal.mutate(
      {
        id: goal.id,
        ...finalPayload,
      },
      {
        onSuccess: () => {
          onClose();
          form.reset();
        },
      },
    );
  };

  return (
    <FormProvider {...form}>
      <Dialog.Root
        open={editGoalActive}
        onOpenChange={(open) => !open && onClose()}
      >
        <Dialog.Trigger asChild>{children}</Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-100 grid content-start overflow-y-auto bg-neutral-900/90 duration-150" />

          <Dialog.Content className="rounded-16 fixed top-1/2 left-1/2 z-100 grid max-h-[85vh] w-9/10 max-w-170 -translate-1/2 gap-300 border border-neutral-600 bg-neutral-800 px-200 py-250 duration-150 focus:outline-none md:p-400">
            <Dialog.Title className="text-preset-4">Edit goal</Dialog.Title>

            <hr className="h-px w-full text-neutral-700" />

            <form
              onSubmit={form.handleSubmit(handleUpdateGoal)}
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
                  className=""
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
                    ariaLabel="Cancel"
                    text="Cancel"
                  />
                </Dialog.Close>

                <ButtonPrimary
                  disabled={updateGoal.isPending || !form.formState.isValid}
                  type="submit"
                  text={
                    updateGoal.isPending ? 'Updating goal...' : 'Save changes'
                  }
                  ariaLabel="Update goal"
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
