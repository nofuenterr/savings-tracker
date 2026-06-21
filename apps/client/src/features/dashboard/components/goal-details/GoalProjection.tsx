import { format } from 'date-fns';

import errorIcon from '../../../../assets/icons/icon-error.svg';
import type { GoalProjectionQueryResult } from '../../types/dashboardType';

export default function GoalProjection({
  goalProjection: { data, isLoading, isError, error, refetch, isFetching },
}: {
  goalProjection: GoalProjectionQueryResult;
}) {
  return (
    <>
      {isLoading || isFetching ? (
        <p>Calculating projected date...</p>
      ) : isError ? (
        <div className="flex items-center gap-150">
          <div className="flex items-center gap-100">
            <img className="size-6" src={errorIcon} alt="" />
            <p className="text-red-500">{error.message}</p>
          </div>
          <button
            className="py-050 h-min shrink-0 cursor-pointer rounded-full bg-orange-400 px-100 text-nowrap hover:bg-orange-500"
            onClick={() => refetch()}
          >
            Retry
          </button>
        </div>
      ) : data ? (
        data.projection.status === 'noProjection' ? (
          <p>Add a deposit to see your projection</p>
        ) : data.projection.status === 'complete' ? (
          <p>You have completed your goal</p>
        ) : data.projection.status === 'onTrack' &&
          data.projection.projectedDate ? (
          <p>
            On track to complete by{' '}
            {format(data.projection.projectedDate, 'MMM d, yyy')}
          </p>
        ) : (
          <p>Your goal has moved away from completion or stalled</p>
        )
      ) : (
        <p>No projection</p>
      )}
    </>
  );
}
