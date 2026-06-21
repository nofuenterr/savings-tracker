import { format } from 'date-fns';

import arrowDownIcon from '../../../../assets/icons/icon-arrow-down.svg';
import { QueryErrorState } from '../../../../components/QueryErrorState';
import currencyFormatter from '../../utils/currencyFormatter';
import type {
  GetGoalTransactionsResponse,
  GoalTransactionsQueryResult,
} from '../../types/dashboardType';

export default function GoalTransactionsContainer({
  goalTransactions: { data, isLoading, isError, error, refetch, isFetching },
}: {
  goalTransactions: GoalTransactionsQueryResult;
}) {
  return (
    <>
      {isLoading || isFetching ? (
        <GoalTransactionsLoading />
      ) : isError ? (
        <div className="lg:w-96">
          <QueryErrorState
            context="goal transactions"
            message={error.message}
            refetch={refetch}
          />
        </div>
      ) : data ? (
        <GoalTransactions goalTransactions={data.goalTransactions} />
      ) : null}
    </>
  );
}

export function GoalTransactionsLoading() {
  return (
    <div className="grid gap-200 lg:w-96">
      <div className="flex items-center justify-between">
        <p className="animate-shimmer h-6 w-36 rounded-full bg-neutral-800"></p>
        <p className="animate-shimmer h-5 w-17 rounded-full bg-neutral-800"></p>
      </div>

      <div>
        <GoalTransactionCardLoading />
        <GoalTransactionCardLoading />
        <GoalTransactionCardLoading />
        <GoalTransactionCardLoading />
        <GoalTransactionCardLoading />
      </div>
    </div>
  );
}

function GoalTransactionCardLoading() {
  return (
    <div className="flex items-center gap-125 border-t border-neutral-800 py-200">
      <div className="animate-shimmer size-10 flex-none rounded-full bg-neutral-800"></div>
      <div className="grid flex-1 gap-[2px]">
        <div className="animate-shimmer h-5 w-26.5 rounded-full bg-neutral-800"></div>
        <div className="animate-shimmer h-5 w-18.5 rounded-full bg-neutral-800"></div>
      </div>
      <div className="animate-shimmer h-5 w-18.5 flex-none rounded-full bg-neutral-800"></div>
    </div>
  );
}

export function GoalTransactions({
  goalTransactions,
}: {
  goalTransactions: GetGoalTransactionsResponse['goalTransactions'];
}) {
  return (
    <div className="grid gap-200 lg:w-96">
      <div className="flex items-center justify-between">
        <p className="text-preset-4">Transaction history</p>
        <p className="text-preset-6 text-neutral-300">
          {goalTransactions.length} transactions
        </p>
      </div>

      {goalTransactions.length > 0 ? (
        <ul>
          {goalTransactions.map((t) => {
            return <Transaction key={t.id} transaction={t} />;
          })}
        </ul>
      ) : (
        <div className="rounded-16 grid place-content-center border border-dashed border-neutral-600 px-200 py-500 text-center">
          <p>No transactions yet</p>
        </div>
      )}
    </div>
  );
}

function Transaction({
  transaction,
}: {
  transaction: GetGoalTransactionsResponse['goalTransactions'][number];
}) {
  return (
    <li>
      <div className="flex items-center gap-125 border-t border-neutral-800 py-200">
        <div
          className={
            `grid size-10 flex-none place-content-center rounded-full bg-neutral-800 ` +
            (transaction.transaction_type === 'withdrawal' ? 'rotate-180' : '')
          }
        >
          {arrowDownIcon && <img src={arrowDownIcon} alt="" />}
        </div>

        <div className="text-preset-6 grid flex-1 gap-[2px]">
          {transaction.note && <p className="truncate">{transaction.note}</p>}
          <p className="text-neutral-300">
            {format(transaction.created_at, 'MMM d, yyy')}
          </p>
        </div>

        <p
          className="flex-none"
          style={{
            color:
              transaction.transaction_type === 'deposit'
                ? 'var(--color-green-500)'
                : 'var(--color-red-500)',
          }}
        >
          {transaction.transaction_type === 'deposit' ? '+' : '-'}
          {currencyFormatter.format(transaction.amount)}
        </p>
      </div>
    </li>
  );
}
