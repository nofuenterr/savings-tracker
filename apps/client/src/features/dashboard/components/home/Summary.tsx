import { format } from 'date-fns';

import starPattern from '../../../../assets/images/pattern-star.svg';
import { QueryErrorState } from '../../../../components/QueryErrorState';
import { useGetDashboard } from '../../api/dashboardHooks';
import type { GetDashboardResponse } from '../../types/dashboardType';
import currencyFormatter from '../../utils/currencyFormatter';

export default function SummaryContainer() {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetDashboard();

  if (isLoading || isFetching) return <SummaryLoading />;

  if (isError)
    return (
      <QueryErrorState
        context="goal summary"
        message={error.message}
        refetch={refetch}
      />
    );

  if (!data) return null;

  return <SummaryContent data={data} />;
}

function SummaryLoading() {
  return (
    <section className="grid grid-cols-1 gap-200 md:grid-cols-2 md:gap-300 lg:grid-cols-4">
      <div className="animate-shimmer rounded-16 grid h-34 gap-400 border border-neutral-600 p-200 md:col-start-1 md:col-end-3 md:h-37 md:p-250 lg:h-40"></div>
      <div className="animate-shimmer rounded-16 grid h-34 gap-400 border border-neutral-600 p-200 md:h-37 md:p-250 lg:h-40"></div>
      <div className="animate-shimmer rounded-16 grid h-34 gap-400 border border-neutral-600 p-200 md:h-37 md:p-250 lg:h-40"></div>
      <div className="animate-shimmer rounded-16 grid h-34 gap-400 border border-neutral-600 p-200 md:col-start-1 md:col-end-3 md:h-37 md:p-250 lg:col-end-5 lg:h-40"></div>
    </section>
  );
}

function SummaryContent({ data }: { data: GetDashboardResponse }) {
  return (
    <section className="grid grid-cols-1 gap-200 md:grid-cols-2 md:gap-300 lg:grid-cols-4">
      <TotalSavings totalSavings={data.totalSavings} />
      <ActiveGoals activeGoals={data.activeGoals} />
      <CompletedGoals completedGoals={data.completedGoals} />
      <MonthlyActivity monthlyActivity={data.monthlyActivity} />
    </section>
  );
}

function TotalSavings({
  totalSavings,
}: {
  totalSavings: GetDashboardResponse['totalSavings'];
}) {
  return (
    <div className="rounded-16 border-neutral-0/30 grid gap-400 border bg-linear-90 from-orange-700 to-orange-400 p-200 md:col-start-1 md:col-end-3 md:p-250">
      <h2 className="text-preset-5-semibold">Total savings</h2>
      <p className="text-preset-1-mobile md:text-preset-1">
        {currencyFormatter.format(totalSavings)}
      </p>
    </div>
  );
}

function ActiveGoals({
  activeGoals,
}: {
  activeGoals: GetDashboardResponse['activeGoals'];
}) {
  return (
    <div
      style={{
        backgroundImage: `url("${starPattern}")`,
        backgroundSize: '200px 200px, cover',
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundPosition: 'calc(100% + 55px) calc(100% + 95px), center',
      }}
      className="rounded-16 grid gap-400 border border-neutral-600 bg-neutral-800 p-200 md:p-250"
    >
      <h2 className="text-preset-5-semibold">Active goals</h2>
      <p
        className={
          `text-preset-1-mobile md:text-preset-1 ` +
          (activeGoals > 0 ? 'text-orange-400' : 'text-neutral-400')
        }
      >
        {activeGoals}
      </p>
    </div>
  );
}

function CompletedGoals({
  completedGoals,
}: {
  completedGoals: GetDashboardResponse['completedGoals'];
}) {
  return (
    <div
      style={{
        backgroundImage: `url("${starPattern}")`,
        backgroundSize: '200px 200px, cover',
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundPosition: 'calc(100% + 55px) calc(100% + 95px), center',
      }}
      className="rounded-16 grid gap-400 border border-neutral-600 bg-neutral-800 p-200 md:p-250"
    >
      <h2 className="text-preset-5-semibold">Goals completed</h2>
      <p
        className={
          `text-preset-1-mobile md:text-preset-1 ` +
          (completedGoals > 0 ? 'text-green-500' : 'text-neutral-400')
        }
      >
        {completedGoals}
      </p>
    </div>
  );
}

function MonthlyActivity({
  monthlyActivity,
}: {
  monthlyActivity: GetDashboardResponse['monthlyActivity'];
}) {
  return (
    <div className="rounded-16 grid gap-250 border border-neutral-600 bg-neutral-800 p-200 md:col-start-1 md:col-end-3 md:p-250 lg:col-end-5">
      <h2 className="text-preset-4">Monthly transactions</h2>
      {monthlyActivity.length > 0 ? (
        <ul>
          {monthlyActivity.map((a, i) => {
            return (
              <li key={`${i}-${format(a.month, 'MMMM')}`}>
                <p>Month: {format(a.month, 'MMMM')}</p>
                <p>Deposits: {currencyFormatter.format(a.deposits)}</p>
                <p>Withdrawals: {currencyFormatter.format(a.withdrawals)}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="grid h-25 place-content-center md:h-30">
          <p className="text-neutral-300">No transactions yet</p>
        </div>
      )}
    </div>
  );
}
