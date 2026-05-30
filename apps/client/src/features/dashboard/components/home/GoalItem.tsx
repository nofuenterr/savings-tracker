import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import type { GetUserGoalsResponse } from '../../types/dashboardType';
import currencyFormatter from '../../utils/currencyFormatter';
import { ProgressBar, ProgressText } from '../Progress';

export default function GoalItem({
  goal: { id, goal_name, progress, current, goal_target, deadline },
}: {
  goal: GetUserGoalsResponse['goals'][number];
}) {
  return (
    <li>
      <Link to={`/dashboard/goals/${id}`} className="rounded-16 block">
        <div className="rounded-16 grid h-60 gap-200 border border-neutral-600 bg-neutral-800 p-200 md:gap-300 md:p-300">
          <GoalHeader goal_name={goal_name} progress={progress} />

          <GoalProgress progress={progress} />

          <GoalInfo
            current={current}
            goal_target={goal_target}
            deadline={deadline}
          />
        </div>
      </Link>
    </li>
  );
}

function GoalHeader({
  goal_name,
  progress,
}: {
  goal_name: string;
  progress: number;
}) {
  return (
    <div className="mb-auto flex items-center justify-between">
      <h3 className="text-preset-4 truncate">{goal_name}</h3>
      {progress >= 100 ? (
        <div className="py-050 rounded-full border border-green-500 bg-green-900 px-125 text-green-500 uppercase">
          Complete
        </div>
      ) : null}
    </div>
  );
}

function GoalProgress({ progress }: { progress: number }) {
  return (
    <div className="grid gap-200">
      <ProgressText progress={progress} />

      <ProgressBar progress={progress} />
    </div>
  );
}

function GoalInfo({
  current,
  goal_target,
  deadline,
}: {
  current: number;
  goal_target: number;
  deadline: Date | null;
}) {
  return (
    <div className="flex flex-wrap items-center gap-100">
      <p>
        {currencyFormatter.format(current)} of{' '}
        {currencyFormatter.format(goal_target)}
      </p>
      <span className="text-neutral-300"> - </span>
      <p className="opacity-70">
        {deadline ? 'Due ' + format(deadline, 'd MMM yyyy') : 'No deadline'}
      </p>
    </div>
  );
}
