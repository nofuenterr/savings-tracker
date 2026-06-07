import { useState, type Dispatch } from 'react';

import type { GoalSortKeys, GoalStatus } from '@savings-tracker/shared';

import targetIcon from '../../../../assets/icons/icon-target.svg';
import filterIcon from '../../../../assets/icons/icon-filter.svg';
import sortIcon from '../../../../assets/icons/icon-sort.svg';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import { QueryErrorState } from '../../../../components/QueryErrorState';
import { useGetUserGoals } from '../../api/dashboardHooks';
import type { GetUserGoalsResponse } from '../../types/dashboardType';
import NewGoalDialog from '../NewGoalDialog';
import GoalItem from './GoalItem';
import FilterDropdown from './FilterDropdown';
import SortByDropdown from './SortByDropdown';

export default function Goals() {
  const [status, setStatus] = useState<GoalStatus>('all');
  const [sortBy, setSortBy] = useState<GoalSortKeys>('newest');

  const { data, isLoading, isError, error, refetch, isRefetching } =
    useGetUserGoals({ status, sortBy });

  if (isLoading || isRefetching) return <GoalsLoading />;

  if (isError)
    return (
      <QueryErrorState
        context="goals list"
        message={error.message}
        refetch={refetch}
      />
    );

  if (!data) return null;

  return (
    <GoalsContent
      goals={data.goals}
      status={status}
      setStatus={setStatus}
      sortBy={sortBy}
      setSortBy={setSortBy}
    />
  );
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

interface GoalsContentProps {
  goals: GetUserGoalsResponse['goals'];
  status: GoalStatus;
  setStatus: Dispatch<React.SetStateAction<GoalStatus>>;
  sortBy: GoalSortKeys;
  setSortBy: Dispatch<React.SetStateAction<GoalSortKeys>>;
}

function GoalsContent({
  goals,
  status,
  setStatus,
  sortBy,
  setSortBy,
}: GoalsContentProps) {
  return (
    <section className="grid gap-300 pt-250">
      <GoalsContentHeader
        currentFilter={status}
        onFilterChange={setStatus}
        currentSort={sortBy}
        onSortChange={setSortBy}
      />

      {goals.length > 0 ? (
        <ul className="grid gap-300 md:grid-cols-2 lg:grid-flow-row-dense lg:grid-cols-3">
          {goals.map((g, i) => {
            return <GoalItem key={g.id} goal={g} index={i} />;
          })}
        </ul>
      ) : (
        <NoGoals />
      )}
    </section>
  );
}

interface GoalsContentHeaderProps {
  currentFilter: GoalStatus;
  onFilterChange: Dispatch<React.SetStateAction<GoalStatus>>;
  currentSort: GoalSortKeys;
  onSortChange: Dispatch<React.SetStateAction<GoalSortKeys>>;
}

function GoalsContentHeader({
  currentFilter,
  onFilterChange,
  currentSort,
  onSortChange,
}: GoalsContentHeaderProps) {
  return (
    <div className="xs:flex-row xs:justify-between xs:items-center flex flex-col justify-start gap-250">
      <h2 className="text-preset-2">Your goals</h2>
      <div className="flex items-center gap-200">
        <FilterDropdown
          currentFilter={currentFilter}
          onFilterChange={onFilterChange}
        >
          <button className="xs:w-max flex w-full cursor-pointer items-center justify-center gap-125 rounded-full border border-neutral-600 bg-neutral-800 px-250 py-150 hover:bg-neutral-700 disabled:cursor-not-allowed disabled:text-neutral-400 disabled:hover:bg-neutral-800">
            <img src={filterIcon} alt="" />
            <span>Filters</span>
          </button>
        </FilterDropdown>

        <SortByDropdown currentSort={currentSort} onSortChange={onSortChange}>
          <button className="xs:w-max flex w-full cursor-pointer items-center justify-center gap-125 rounded-full border border-neutral-600 bg-neutral-800 px-250 py-150 hover:bg-neutral-700 disabled:cursor-not-allowed disabled:text-neutral-400 disabled:hover:bg-neutral-800">
            <img src={sortIcon} alt="" />
            <span>Sort by</span>
          </button>
        </SortByDropdown>
      </div>
    </div>
  );
}

function NoGoals() {
  const [newGoalActive, setNewGoalActive] = useState<boolean>(false);

  return (
    <div className="rounded-16 grid place-content-center place-items-center gap-400 border border-dashed border-neutral-600 px-200 py-500 text-center">
      <div className="grid max-w-lg place-items-center gap-250">
        <img src={targetIcon} alt="" />
        <h3 className="text-preset-2">No goals yet</h3>
        <p className="text-neutral-300">
          Start saving for something that matters. Create your first goal and
          track your progress.
        </p>
      </div>
      <NewGoalDialog
        newGoalActive={newGoalActive}
        onClose={() => setNewGoalActive(false)}
      >
        <ButtonPrimary
          onClick={() => setNewGoalActive(true)}
          type="button"
          text="+ Create your first goal"
        />
      </NewGoalDialog>
    </div>
  );
}
