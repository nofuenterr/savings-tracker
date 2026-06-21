import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';

import chevronLeftIcon from '../../../../assets/icons/icon-chevron-left.svg';
import { QueryErrorState } from '../../../../components/QueryErrorState';
import ButtonSecondary from '../../../../components/ButtonSecondary';
import {
  useGetGoal,
  useGetGoalProjection,
  useGetGoalTransactions,
} from '../../api/dashboardHooks';
import type {
  GetGoalResponse,
  GoalProjectionQueryResult,
  GoalTransactionsQueryResult,
} from '../../types/dashboardType';
import handleDownloadGoalDetailsPDF from '../../utils/handleDownloadGoalDetailsPDF';
import EditGoalDialog from './EditGoalDialog';
import DeleteGoalDialog from './DeleteGoalDialog';
import { GoalDetailsLoading } from './GoalDetailsLoading';
import CompletedGoal from './CompletedGoal';
import InProgressGoal from './InProgressGoal';
import GoalTransactions from './GoalTransactions';

export default function GoalDetailsContainer() {
  const params = useParams();
  const id = params.id;

  const { data, isLoading, isError, error, refetch, isFetching } = useGetGoal({
    id: Number(id),
  });

  if (isLoading || isFetching) return <GoalDetailsLoading />;

  if (isError)
    return (
      <QueryErrorState
        context="goal details"
        message={error.message}
        refetch={refetch}
      />
    );

  if (!data) return null;

  return <GoalDetailsContent goal={data.goal} id={Number(id)} />;
}

function GoalDetailsContent({
  goal,
  id,
}: {
  goal: GetGoalResponse['goal'];
  id: number;
}) {
  const goalTransactions = useGetGoalTransactions({
    id: Number(id),
  });

  const goalProjection = useGetGoalProjection({
    id: Number(id),
  });

  return (
    <section className="grid gap-400">
      <GoalDetailsHeader
        goal={goal}
        goalTransactions={goalTransactions}
        goalProjection={goalProjection}
      />

      <div className="grid items-start gap-400 md:gap-600 lg:grid-cols-[1fr_auto]">
        {goal.progress >= 100 ? (
          <CompletedGoal
            goal={goal}
            transactionsCount={goalTransactions.data?.goalTransactions.length}
          />
        ) : (
          <InProgressGoal goal={goal} goalProjection={goalProjection} />
        )}

        <GoalTransactions goalTransactions={goalTransactions} />
      </div>
    </section>
  );
}

function GoalDetailsHeader({
  goal,
  goalTransactions: { data: transactionsData },
  goalProjection: { data: goalProjectionData },
}: {
  goal: GetGoalResponse['goal'];
  goalTransactions: GoalTransactionsQueryResult;
  goalProjection: GoalProjectionQueryResult;
}) {
  const [editGoalActive, setEditGoalActive] = useState<boolean>(false);
  const [deleteGoalActive, setDeleteGoalActive] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="grid gap-125">
      <div className="flex h-10 items-center gap-100 md:h-12">
        <button
          className="gap-075 group mr-auto flex cursor-pointer items-center rounded-full text-neutral-400"
          onClick={() => navigate(-1)}
        >
          {chevronLeftIcon && <img src={chevronLeftIcon} alt="" />}
          <span className="group-hover:text-neutral-300">Back</span>
        </button>

        <EditGoalDialog
          goal={goal}
          editGoalActive={editGoalActive}
          onClose={() => setEditGoalActive(false)}
        >
          <button
            onClick={() => setEditGoalActive(true)}
            className="hover:text-neutral-0 cursor-pointer rounded-full px-150 py-100 text-neutral-300 hover:bg-neutral-800 md:px-200 md:py-150"
          >
            Edit goal
          </button>
        </EditGoalDialog>

        <DeleteGoalDialog
          goalName={goal.goal_name}
          goalId={goal.id}
          deleteGoalActive={deleteGoalActive}
          onClose={() => setDeleteGoalActive(false)}
        >
          <button
            onClick={() => setDeleteGoalActive(true)}
            className="cursor-pointer rounded-full px-150 py-100 text-red-500 hover:bg-neutral-800 md:px-200 md:py-150"
          >
            Delete goal
          </button>
        </DeleteGoalDialog>

        {transactionsData?.goalTransactions &&
        goalProjectionData?.projection ? (
          <ButtonSecondary
            onClick={() =>
              handleDownloadGoalDetailsPDF({
                goal,
                transactions: transactionsData.goalTransactions,
                projection: goalProjectionData.projection,
                setIsDownloading,
              })
            }
            text={isDownloading ? 'Downloading...' : 'Download PDF'}
            type="button"
            disabled={isDownloading}
            ariaLabel="Download as PDF"
          />
        ) : null}
      </div>

      <h1 className="text-preset-1-mobile md:text-preset-1 truncate">
        {goal.goal_name}
      </h1>

      <div className="gap-075 text-preset-6 md:text-preset-5 flex items-center text-neutral-300">
        <p>
          {goal.deadline
            ? 'Due ' + format(goal.deadline, 'd MMM yyyy')
            : 'No deadline'}
        </p>
        <span>•</span>
        <p>Created {format(goal.created_at, 'MMM d, yyy')}</p>
      </div>
    </div>
  );
}
