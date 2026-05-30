import type { GetGoalResponse } from '../../types/dashboardType';
import currencyFormatter from '../../utils/currencyFormatter';
import { ProgressBar, ProgressText } from '../Progress';
import TransactionForm from './TransactionForm';

export default function InProgressGoal({
  goal,
}: {
  goal: GetGoalResponse['goal'];
}) {
  return (
    <div className="grid gap-300">
      <InProgressGoalContent goal={goal} />

      <TransactionForm />
    </div>
  );
}

function InProgressGoalContent({ goal }: { goal: GetGoalResponse['goal'] }) {
  return (
    <div className="rounded-12 grid gap-300 border border-neutral-600 bg-neutral-800 p-200 md:p-300">
      <div className="flex items-center justify-between gap-100">
        <ProgressText progress={goal.progress} />

        <p className="text-preset-5-semibold md:text-preset-4 text-end text-neutral-300">
          {currencyFormatter.format(goal.goal_target - goal.current)} remaining
        </p>
      </div>

      <div className="grid gap-200">
        <ProgressBar progress={goal.progress} />

        <div className="text-preset-6 flex items-center justify-between gap-100">
          <p className="gap-050 grid">
            <span>{currencyFormatter.format(goal.current)}</span>
            <span className="text-neutral-300">Saved so far</span>
          </p>

          <p className="gap-050 grid text-end">
            <span>of {currencyFormatter.format(goal.goal_target)}</span>
            <span className="justify-self-end text-neutral-300">Target</span>
          </p>
        </div>
      </div>
    </div>
  );
}
