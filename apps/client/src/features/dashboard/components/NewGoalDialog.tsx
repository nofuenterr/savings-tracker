import { useState, type ReactNode, type SubmitEvent } from 'react';
import { isAxiosError } from 'axios';
import { Dialog } from 'radix-ui';

import crossIcon from '../../../assets/icons/icon-cross.svg';
import dollarIcon from '../../../assets/icons/icon-dollar.svg';
import InputBlock from '../../../components/InputBlock';
import ErrorMessage from '../../../components/ErrorMessage';
import ButtonPrimary from '../../../components/ButtonPrimary';
import ButtonSecondary from '../../../components/ButtonSecondary';
import getFieldError from '../../../utils/getFieldError';
import type { ErrorResponse } from '../../../types/errorType';
import { useCreateGoal } from '../api/dashboardHooks';
import toLocalDateString from '../utils/localDateFormatter';

interface NewGoalDialogProps {
  newGoalActive: boolean;
  onClose: () => void;
  children: ReactNode;
}

interface NewGoalCredentials {
  goalName: string;
  goalTarget: number;
  deadline?: Date;
}

export default function NewGoalDialog({
  newGoalActive,
  onClose,
  children,
}: NewGoalDialogProps) {
  const [goalName, setGoalName] = useState<string>('');
  const [goalTarget, setGoalTarget] = useState<string>('0');
  const [deadline, setDeadline] = useState<Date | null>(null);

  const createGoal = useCreateGoal();

  const serverErrors = isAxiosError<ErrorResponse>(createGoal.error)
    ? createGoal.error.response?.data
    : null;

  const fieldErrors = serverErrors?.errors;

  const generalError =
    serverErrors && !fieldErrors?.length ? serverErrors.message : null;

  const goalNameError = getFieldError(fieldErrors, 'goalName');
  const goalTargetError = getFieldError(fieldErrors, 'goalTarget');
  const deadlineError = getFieldError(fieldErrors, 'deadline');

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    createGoal.mutate(
      {
        goalName,
        goalTarget: Number(goalTarget),
        deadline: deadline ? deadline : undefined,
      } as NewGoalCredentials,
      {
        onSuccess: () => {
          onClose();
          handleReset();
        },
      },
    );
  }

  function handleReset() {
    setGoalName('');
    setGoalTarget('0');
    setDeadline(null);
  }

  return (
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

          <form onSubmit={handleSubmit} className="grid gap-300">
            <fieldset className="grid min-h-0 flex-1 gap-250">
              <InputBlock
                label="Goal name"
                type="text"
                required={true}
                autoFocus={true}
                id="goal_name"
                name="goal_name"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                placeholder="e.g. MacBook Pro M4"
                maxLength={150}
                errorMessage={goalNameError}
              />
              <InputBlock
                label="Target amount"
                type="text"
                required={true}
                id="goal_target"
                name="goal_target"
                value={goalTarget}
                onChange={(e) => {
                  const rawValue = e.target.value;
                  if (rawValue === '' || /^\d+$/.test(rawValue)) {
                    setGoalTarget(rawValue);
                  }
                }}
                placeholder="0.00"
                min={1}
                inputMode="numeric"
                pattern="[0-9]*"
                className="no-spinner pl-11"
                errorMessage={goalTargetError}
                icon={dollarIcon}
              />
              <InputBlock
                label="Deadline (optional)"
                type="date"
                id="deadline"
                name="deadline"
                value={
                  deadline instanceof Date && !isNaN(deadline.getTime())
                    ? toLocalDateString(new Date(deadline))
                    : ''
                }
                onChange={(e) => {
                  const val = e.target.value;
                  if (!val) {
                    setDeadline(null);
                    return;
                  }
                  const [year, month, day] = val.split('-').map(Number);
                  setDeadline(new Date(year, month - 1, day));
                }}
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
                disabled={createGoal.isPending || !goalName || !goalTarget}
                type="submit"
                text={createGoal.isPending ? 'Creating goal...' : 'Create goal'}
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
  );
}
