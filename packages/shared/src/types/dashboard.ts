export type TransactionType = 'deposit' | 'withdrawal';

export type GoalStatus = 'all' | 'inProgress' | 'completed' | 'notStarted';

export type GoalSortKeys =
  | 'newest'
  | 'oldest'
  | 'goal_target_desc'
  | 'goal_target_asc'
  | 'deadline_desc'
  | 'deadline_asc'
  | 'progress_desc'
  | 'progress_asc'
  | 'amount_saved_desc'
  | 'amount_saved_asc'
  | 'goal_name_desc'
  | 'goal_name_asc';
