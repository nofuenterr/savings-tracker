import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import gridPattern from '../../../../assets/images/pattern-grid.svg';
import type { GetUserGoalsResponse } from '../../types/dashboardType';
import currencyFormatter from '../../utils/currencyFormatter';
import { ProgressBar, ProgressText } from '../Progress';

export default function GoalItem({
  goal: { id, goal_name, progress, current, goal_target, deadline },
  index,
}: {
  goal: GetUserGoalsResponse['goals'][number];
  index: number;
}) {
  const isGradientCard = index % 4 === 0;

  return (
    <li className="group h-full min-w-0 md:max-lg:nth-[4n+1]:col-span-2 md:max-lg:nth-[4n+2]:last:col-start-2 md:max-lg:nth-[4n+4]:col-span-2 md:max-lg:nth-[4n+1]:nth-last-[2]:col-span-1 lg:nth-[8n+1]:col-span-2 lg:nth-[8n+1]:last:col-span-3 lg:nth-[8n+2]:col-span-1 lg:nth-[8n+2]:col-start-1 lg:nth-[8n+2]:last:col-start-3 lg:nth-[8n+3]:col-span-1 lg:nth-[8n+3]:col-start-2 lg:nth-[8n+3]:last:col-start-3 lg:nth-[8n+3]:last:row-span-2 lg:nth-[8n+4]:col-start-3 lg:nth-[8n+4]:row-span-2 lg:nth-[8n+5]:col-span-2 lg:nth-[8n+5]:col-start-2 lg:nth-[8n+5]:last:col-span-3 lg:nth-[8n+6]:col-span-1 lg:nth-[8n+6]:col-start-2 lg:nth-[8n+6]:last:col-start-1 lg:nth-[8n+7]:col-span-1 lg:nth-[8n+7]:col-start-3 lg:nth-[8n+7]:last:col-start-1 lg:nth-[8n+7]:last:row-span-2 lg:nth-[8n+8]:col-start-1 lg:nth-[8n+8]:row-span-2 lg:nth-[8n+2]:nth-last-[2]:col-span-2 lg:nth-[8n+2]:nth-last-[2]:col-start-1 lg:nth-[8n+6]:nth-last-[2]:col-span-2 lg:nth-[8n+6]:nth-last-[2]:col-start-2">
      <Link to={`/dashboard/goals/${id}`} className="rounded-16 block h-full">
        <div
          style={{
            backgroundImage: isGradientCard
              ? `url(${gridPattern}), linear-gradient(90deg, var(--color-orange-700), var(--color-orange-400))`
              : `url(${gridPattern})`,
          }}
          className="rounded-16 relative isolate flex h-60 flex-col gap-200 overflow-hidden border border-neutral-600 bg-neutral-800 bg-cover bg-center bg-no-repeat p-200 md:gap-300 md:p-300 lg:h-full lg:min-h-60"
        >
          <GoalHeader goal_name={goal_name} progress={progress} />

          <GoalProgress progress={progress} isGradientCard={isGradientCard} />

          <GoalInfo
            current={current}
            goal_target={goal_target}
            deadline={deadline}
            isGradientCard={isGradientCard}
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
    <div className="mb-auto flex items-center justify-between gap-100">
      <h3 className="text-preset-4 min-w-0 flex-1 truncate">{goal_name}</h3>
      {progress >= 100 ? (
        <div className="py-020 text-preset-6 shrink-0 rounded-full border border-green-500 bg-green-900 px-125 text-green-500 uppercase">
          Complete
        </div>
      ) : null}
    </div>
  );
}

function GoalProgress({
  progress,
  isGradientCard,
}: {
  progress: number;
  isGradientCard: boolean;
}) {
  return (
    <div className="grid gap-200">
      <ProgressText progress={progress} isGradientCard={isGradientCard} />

      <ProgressBar progress={progress} isGradientCard={isGradientCard} />
    </div>
  );
}

function GoalInfo({
  current,
  goal_target,
  deadline,
  isGradientCard,
}: {
  current: number;
  goal_target: number;
  deadline: Date | null;
  isGradientCard: boolean;
}) {
  return (
    <div className="gap-075 flex flex-wrap items-center">
      <p>
        {currencyFormatter.format(current)} of{' '}
        {currencyFormatter.format(goal_target)}
      </p>
      <span
        style={
          isGradientCard
            ? { color: 'var(--color-neutral-0)', opacity: '0.3' }
            : { color: 'var(--color-neutral-300)' }
        }
      >
        •
      </span>
      <p style={{ opacity: isGradientCard ? '1' : '0.7' }}>
        {deadline ? 'Due ' + format(deadline, 'd MMM yyyy') : 'No deadline'}
      </p>
    </div>
  );
}
