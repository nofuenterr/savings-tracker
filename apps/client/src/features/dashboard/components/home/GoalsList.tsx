import type {
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query';

import targetIcon from '../../../../assets/icons/icon-target.svg';
import filterIcon from '../../../../assets/icons/icon-filter.svg';
import sortIcon from '../../../../assets/icons/icon-sort.svg';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import { useGetUserGoals } from '../../api/dashboardHooks';
import type { GetUserGoalsResponse } from '../../types/dashboardType';
import GoalItem from './GoalItem';

type Refetch = (
  options?: RefetchOptions | undefined,
) => Promise<QueryObserverResult<GetUserGoalsResponse, Error>>;

export default function Goals() {
  const { data, isLoading, isError, error, refetch, isRefetching } =
    useGetUserGoals({});

  if (isLoading || isRefetching) return <GoalsLoading />;

  if (isError) return <GoalsError message={error.message} refetch={refetch} />;

  if (!data) return null;

  return <GoalsContent goals={data.goals} />;
}

function GoalsLoading() {
  return (
    <div className="grid gap-300 pt-250">
      <div className="xs:flex-row xs:justify-between xs:items-center flex flex-col justify-start gap-250">
        <div className="animate-shimmer h-9.5 w-41.5 rounded-full bg-neutral-800"></div>
        <div className="flex items-center gap-200">
          <div className="animate-shimmer xs:w-max min-h-12 w-full min-w-29 rounded-full border border-neutral-600 bg-neutral-800"></div>
          <div className="animate-shimmer xs:w-max min-h-12 w-full min-w-29 rounded-full border border-neutral-600 bg-neutral-800"></div>
        </div>
      </div>

      <div className="grid gap-300">
        <div className="animate-shimmer rounded-16 h-60 border border-neutral-600 bg-neutral-800"></div>
        <div className="animate-shimmer rounded-16 h-60 border border-neutral-600 bg-neutral-800"></div>
        <div className="animate-shimmer rounded-16 h-60 border border-neutral-600 bg-neutral-800"></div>
        <div className="animate-shimmer rounded-16 h-60 border border-neutral-600 bg-neutral-800"></div>
      </div>
    </div>
  );
}

function GoalsError({
  message,
  refetch,
}: {
  message: string;
  refetch: Refetch;
}) {
  return (
    <div className="rounded-16 order grid min-h-34 place-content-center gap-200 border border-neutral-600 bg-neutral-800 p-200 text-center text-balance md:min-h-37 md:p-250 lg:min-h-40">
      <h2 className="text-preset-4">Failed to load goals data: {message}</h2>
      <ButtonPrimary type="button" text="Retry" onClick={() => refetch()} />
    </div>
  );
}

function GoalsContent({ goals }: { goals: GetUserGoalsResponse['goals'] }) {
  return (
    <section className="grid gap-300 pt-250">
      <GoalsContentHeader length={goals.length} />

      {goals.length > 0 ? (
        <ul className="grid gap-300">
          {goals.map((g) => {
            return <GoalItem key={g.id} goal={g} />;
          })}
        </ul>
      ) : (
        <NoGoals />
      )}
    </section>
  );
}

function GoalsContentHeader({ length }: { length: number }) {
  return (
    <div className="xs:flex-row xs:justify-between xs:items-center flex flex-col justify-start gap-250">
      <h2 className="text-preset-2">Your goals</h2>
      <div className="flex items-center gap-200">
        <button
          disabled={length === 0}
          className="xs:w-max flex w-full cursor-pointer items-center justify-center gap-125 rounded-full border border-neutral-600 bg-neutral-800 px-250 py-150 hover:bg-neutral-700 disabled:cursor-not-allowed disabled:text-neutral-400 disabled:hover:bg-neutral-800"
        >
          {filterIcon && <img src={filterIcon} alt="" />}
          <span>Filters</span>
        </button>

        <button
          disabled={length === 0}
          className="xs:w-max flex w-full cursor-pointer items-center justify-center gap-125 rounded-full border border-neutral-600 bg-neutral-800 px-250 py-150 hover:bg-neutral-700 disabled:cursor-not-allowed disabled:text-neutral-400 disabled:hover:bg-neutral-800"
        >
          {sortIcon && <img src={sortIcon} alt="" />}
          <span>Sort by</span>
        </button>
      </div>
    </div>
  );
}

function NoGoals() {
  return (
    <div className="rounded-16 grid place-content-center place-items-center gap-400 border border-dashed border-neutral-600 px-200 py-500 text-center">
      <div className="grid max-w-lg place-items-center gap-250">
        {targetIcon && <img src={targetIcon} alt="" />}
        <h3 className="text-preset-2">No goals yet</h3>
        <p className="text-neutral-300">
          Start saving for something that matters. Create your first goal and
          track your progress.
        </p>
      </div>
      <ButtonPrimary type="button" text="+ Create your first goal" />
    </div>
  );
}
