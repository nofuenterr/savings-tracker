import { GoalTransactionsLoading } from './GoalTransactions';

export function GoalDetailsLoading() {
  return (
    <div className="grid gap-400">
      <div className="grid gap-125">
        <div className="flex h-10 items-center gap-100 md:h-12">
          <div className="animate-shimmer mr-auto h-12 w-15 rounded-full bg-neutral-800"></div>
          <div className="animate-shimmer h-12 w-24 rounded-full bg-neutral-800"></div>
          <div className="animate-shimmer h-12 w-24 rounded-full bg-neutral-800"></div>
        </div>

        <div className="animate-shimmer h-11 w-full max-w-80 rounded-full bg-neutral-800 md:h-16 md:max-w-[500px]"></div>

        <div className="gap-075 flex items-center">
          <div className="animate-shimmer h-5 w-25 rounded-full bg-neutral-800 md:h-6 md:w-29"></div>
          <div className="animate-shimmer size-2 rounded-full bg-neutral-800"></div>
          <div className="animate-shimmer h-5 w-36 rounded-full bg-neutral-800 md:h-6 md:w-40"></div>
        </div>
      </div>

      <div className="grid items-start gap-400 md:gap-600 lg:grid-cols-[1fr_auto]">
        <div className="grid gap-300">
          <div className="animate-shimmer rounded-12 h-43 border border-neutral-600 bg-neutral-800 md:h-52"></div>
          <div className="animate-shimmer rounded-12 h-85 border border-neutral-600 bg-neutral-800 md:h-91"></div>
        </div>

        <GoalTransactionsLoading />
      </div>
    </div>
  );
}
