import { AlertDialog } from 'radix-ui';
import type { ReactNode } from 'react';

import crossIcon from '../../../../assets/icons/icon-cross.svg';
import ButtonSecondary from '../../../../components/ButtonSecondary';
import { useDeleteGoal } from '../../api/dashboardHooks';

interface DeleteGoalProps {
  goalName: string;
  goalId: number;
  deleteGoalActive: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function DeleteGoalDialog({
  goalName,
  goalId,
  deleteGoalActive,
  onClose,
  children,
}: DeleteGoalProps) {
  const deleteGoal = useDeleteGoal();

  return (
    <AlertDialog.Root
      open={deleteGoalActive}
      onOpenChange={(open) => !open && onClose()}
    >
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-100 grid content-start overflow-y-auto bg-neutral-900/90 duration-150" />

        <AlertDialog.Content className="rounded-16 fixed top-1/2 left-1/2 z-100 grid max-h-[85vh] w-9/10 max-w-170 -translate-1/2 gap-300 border border-neutral-600 bg-neutral-800 px-200 py-250 duration-150 focus:outline-none md:p-400">
          <div className="grid gap-150">
            <AlertDialog.Title className="text-preset-4">
              Delete {goalName ? goalName : 'goal'}
            </AlertDialog.Title>

            <AlertDialog.Description className="text-preset-5 opacity-80">
              This will permanently delete this goal and all its deposit
              history. This cannot be undone.
            </AlertDialog.Description>
          </div>

          <hr className="h-px w-full text-neutral-700" />

          <div className="flex items-center justify-end gap-200">
            <AlertDialog.Cancel asChild>
              <ButtonSecondary type="button" ariaLabel="Cancel" text="Cancel" />
            </AlertDialog.Cancel>

            <AlertDialog.Action
              asChild
              onClick={() => deleteGoal.mutate({ id: goalId })}
              disabled={deleteGoal.isPending}
            >
              <button className="cursor-pointer rounded-full bg-red-500 px-250 py-150 text-neutral-900 hover:bg-red-500/90 disabled:bg-neutral-800 disabled:text-neutral-600">
                {deleteGoal.isPending ? 'Deleting goal...' : 'Delete goal'}
              </button>
            </AlertDialog.Action>
          </div>

          <AlertDialog.Cancel asChild>
            <button className="p-075 absolute top-250 right-250 cursor-pointer rounded-full bg-transparent text-neutral-400 hover:bg-neutral-600">
              <img src={crossIcon} alt="X" />
            </button>
          </AlertDialog.Cancel>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
