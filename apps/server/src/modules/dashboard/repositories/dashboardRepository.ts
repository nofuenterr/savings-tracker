import db from '../../../includes/db/db';
import {
  InsertGoalParams,
  InsertTransactionParams,
  DeletedGoalRow,
  DeleteGoalByIdParams,
  FindGoalByIdParams,
  FindTransactionsByGoalIdAndTypeParams,
  FindTransactionsByGoalIdParams,
  FindTransactionsByUserIdAndTypeParams,
  GoalRow,
  TransactionRow,
  UpdatedGoalRow,
  UpdateGoalByIdParams,
  UserIdParams,
  TotalSavingsRow,
  MonthlyActivityRow,
  FindGoalBalanceByIdParams,
  GoalBalanceRow,
  FindGoalsByUserIdParams,
  GoalWithBalanceRow,
  GoalWithBalanceAndProgressRow,
} from '../types/dashboardType';
import { goalSortOptions } from '../utils/dashboardUtil';

export const findUserTotalSavingsByUserId = async ({
  userId,
}: UserIdParams): Promise<TotalSavingsRow | undefined> => {
  const { rows } = await db.query<TotalSavingsRow>(
    `
    SELECT total_savings
    FROM user_total_savings
    WHERE user_id = $1
    `,
    [userId],
  );

  return rows[0];
};

export const findUserMonthlyActivityByUserId = async ({
  userId,
}: UserIdParams): Promise<MonthlyActivityRow[]> => {
  const { rows } = await db.query<MonthlyActivityRow>(
    `
    SELECT month, deposits, withdrawals
    FROM monthly_activity
    WHERE user_id = $1
    ORDER BY month DESC;
    `,
    [userId],
  );

  return rows;
};

export const findGoalsByUserId = async ({
  userId,
  status,
  sortBy = 'newest',
}: FindGoalsByUserIdParams): Promise<GoalWithBalanceAndProgressRow[]> => {
  const sortMeta = goalSortOptions[sortBy];
  const col = sortMeta.table
    ? `${sortMeta.table}.${sortMeta.column}`
    : sortMeta.column;

  const params = [userId];

  let query = `
    SELECT g.id, g.user_id, g.goal_name, g.goal_target, g.deadline, g.created_at,
      COALESCE(gb.current, 0) AS current,
      (COALESCE(gb.current, 0) / g.goal_target * 100) AS progress
    FROM goals AS g
    LEFT JOIN goal_balances AS gb ON g.id = gb.goal_id
    WHERE g.user_id = $1
  `;

  if (status) {
    if (status === 'inProgress') query += ' AND gb.current < g.goal_target';
    if (status === 'completed') query += ' AND gb.current >= g.goal_target';
    if (status === 'notStarted') query += ' AND gb.goal_id IS NULL';
  }

  query += ` ORDER BY ${col} ${sortMeta.direction}, g.id ${sortMeta.direction}`;

  const { rows } = await db.query(query, params);

  return rows;
};

export const findGoalById = async ({
  userId,
  id,
}: FindGoalByIdParams): Promise<GoalWithBalanceRow | undefined> => {
  const { rows } = await db.query<GoalWithBalanceRow>(
    `
    SELECT g.id, g.user_id, g.goal_name, g.goal_target, g.deadline, g.created_at,
      COALESCE(gb.current, 0) AS current
    FROM goals AS g
    LEFT JOIN goal_balances AS gb ON g.id = gb.goal_id
    WHERE g.user_id = $1
      AND g.id = $2
    LIMIT 1
    `,
    [userId, id],
  );

  return rows[0];
};

export const findGoalBalanceById = async ({
  id,
}: FindGoalBalanceByIdParams): Promise<GoalBalanceRow | undefined> => {
  const { rows } = await db.query<GoalBalanceRow>(
    `
    SELECT current
    FROM goal_balances
    WHERE goal_id = $1
    LIMIT 1
    `,
    [id],
  );

  return rows[0];
};

export const insertGoal = async ({
  userId,
  goalName,
  goalTarget,
  deadline,
}: InsertGoalParams): Promise<GoalRow | undefined> => {
  const { rows } = await db.query<GoalRow>(
    `
    INSERT INTO goals (user_id, goal_name, goal_target, deadline)
    VALUES ($1, $2, $3, $4)
    RETURNING id, user_id, goal_name, goal_target, deadline, created_at
    `,
    [userId, goalName, goalTarget, deadline],
  );

  return rows[0];
};

export const updateGoalById = async ({
  userId,
  id,
  goalName,
  goalTarget,
  deadline,
}: UpdateGoalByIdParams): Promise<UpdatedGoalRow | undefined> => {
  const { rows } = await db.query<UpdatedGoalRow>(
    `
    UPDATE goals
    SET
      goal_name = COALESCE($3, goal_name),
      goal_target = COALESCE($4, goal_target),
      deadline = COALESCE($5, deadline),
      updated_at = NOW()
    WHERE user_id = $1
      AND id = $2
    RETURNING id, user_id, goal_name, goal_target, deadline, updated_at
    `,
    [userId, id, goalName, goalTarget, deadline],
  );

  return rows[0];
};

export const deleteGoalById = async ({
  userId,
  id,
}: DeleteGoalByIdParams): Promise<DeletedGoalRow | undefined> => {
  const { rows } = await db.query<DeletedGoalRow>(
    `
    DELETE FROM goals
    WHERE user_id = $1
      AND id = $2
    RETURNING id, goal_name
    `,
    [userId, id],
  );

  return rows[0];
};

export const insertTransaction = async ({
  userId,
  goalId,
  amount,
  note,
  transactionType,
}: InsertTransactionParams): Promise<TransactionRow | undefined> => {
  const { rows } = await db.query<TransactionRow>(
    `
    INSERT INTO transactions (user_id, goal_id, amount, note, transaction_type)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, user_id, goal_id, transaction_type, amount, note, created_at
    `,
    [userId, goalId, amount, note, transactionType],
  );

  return rows[0];
};

export const findTransactionsByGoalId = async ({
  userId,
  goalId,
}: FindTransactionsByGoalIdParams): Promise<TransactionRow[]> => {
  const { rows } = await db.query<TransactionRow>(
    `
    SELECT id, user_id, goal_id, transaction_type, amount, note, created_at
    FROM transactions
    WHERE user_id = $1
      AND goal_id = $2
    ORDER BY created_at DESC
    `,
    [userId, goalId],
  );

  return rows;
};

export const findTransactionsByGoalIdAndType = async ({
  userId,
  goalId,
  transactionType,
}: FindTransactionsByGoalIdAndTypeParams): Promise<TransactionRow[]> => {
  const { rows } = await db.query<TransactionRow>(
    `
    SELECT id, user_id, goal_id, transaction_type, amount, note, created_at
    FROM transactions
    WHERE user_id = $1
      AND goal_id = $2
      AND transaction_type = $3
    ORDER BY created_at DESC
    `,
    [userId, goalId, transactionType],
  );

  return rows;
};

export const findTransactionsByUserId = async ({
  userId,
}: UserIdParams): Promise<TransactionRow[]> => {
  const { rows } = await db.query<TransactionRow>(
    `
    SELECT id, user_id, goal_id, transaction_type, amount, note, created_at
    FROM transactions
    WHERE user_id = $1
    ORDER BY created_at DESC
    `,
    [userId],
  );

  return rows;
};

export const findTransactionsByUserIdAndType = async ({
  userId,
  transactionType,
}: FindTransactionsByUserIdAndTypeParams): Promise<TransactionRow[]> => {
  const { rows } = await db.query<TransactionRow>(
    `
    SELECT id, user_id, goal_id, transaction_type, amount, note, created_at
    FROM transactions
    WHERE user_id = $1
      AND transaction_type = $2
    ORDER BY created_at DESC
    `,
    [userId, transactionType],
  );

  return rows;
};
