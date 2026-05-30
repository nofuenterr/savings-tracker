import { format } from 'date-fns';

import checkmarkIcon from '../../../../assets/icons/icon-checkmark.svg';
import type { GetGoalResponse } from '../../types/dashboardType';
import currencyFormatter from '../../utils/currencyFormatter';

export default function CompletedGoal({
  goal,
  transactionsCount,
}: {
  goal: GetGoalResponse['goal'];
  transactionsCount?: number;
}) {
  return (
    <div className="rounded-16 grid gap-500 bg-linear-90 from-orange-700 to-orange-400 px-200 py-500 md:px-300 md:py-600">
      <div className="bg-neutral-0/30 border-neutral-0 grid size-16 place-content-center rounded-full border">
        {checkmarkIcon && <img src={checkmarkIcon} alt="" />}
      </div>

      <div className="grid gap-300">
        <p className="text-preset-1">{goal.progress.toFixed(2)}%</p>

        <div className="grid gap-125">
          <p className="text-preset-2">Goal Complete</p>
          <p>
            You saved {currencyFormatter.format(goal.current)}{' '}
            {transactionsCount && `across ${transactionsCount} transactions`}{' '}
            and finished your goal
            {goal.deadline
              ? ` before your ${format(goal.deadline, 'MMM d, yyy')} deadline.`
              : '.'}
          </p>
        </div>
      </div>

      <div className="2xs:flex-row flex flex-col items-start gap-250 md:gap-400">
        {transactionsCount && (
          <>
            <p className="grid gap-100">
              <span className="text-preset-2">{transactionsCount}</span>
              <span className="uppercase">Transactions</span>
            </p>
            <div className="bg-neutral-0/30 2xs:h-full 2xs:w-px h-px w-full" />
          </>
        )}
        <p className="grid gap-100">
          <span className="text-preset-2">
            {currencyFormatter.format(goal.current)}
          </span>
          <span className="uppercase">Total Saved</span>
        </p>
      </div>
    </div>
  );
}
