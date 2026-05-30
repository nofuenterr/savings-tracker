import { format } from 'date-fns';

import arrowDownIcon from '../../../../assets/icons/icon-arrow-down.svg';
import type { GetGoalTransactionsResponse } from '../../types/dashboardType';
import currencyFormatter from '../../utils/currencyFormatter';

export default function GoalTransactions({
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
