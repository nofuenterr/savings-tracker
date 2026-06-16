import { GoalSortOptions } from '../types/dashboardType';

export const goalSortOptions: GoalSortOptions = {
  newest: { column: 'created_at', direction: 'DESC', table: 'g' },
  oldest: { column: 'created_at', direction: 'ASC', table: 'g' },
  goal_target_desc: { column: 'goal_target', direction: 'DESC', table: 'g' },
  goal_target_asc: { column: 'goal_target', direction: 'ASC', table: 'g' },
  deadline_desc: { column: 'deadline', direction: 'DESC', table: 'g' },
  deadline_asc: { column: 'deadline', direction: 'ASC', table: 'g' },
  progress_desc: { column: 'progress', direction: 'DESC' },
  progress_asc: { column: 'progress', direction: 'ASC' },
  amount_saved_desc: { column: 'current', direction: 'DESC' },
  amount_saved_asc: { column: 'current', direction: 'ASC' },
  goal_name_desc: { column: 'goal_name', direction: 'DESC', table: 'g' },
  goal_name_asc: { column: 'goal_name', direction: 'ASC', table: 'g' },
};

export function getDaysDifference({
  date1,
  date2,
}: {
  date1: Date;
  date2: Date;
}) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  const diffInMs = Math.abs(Number(d2) - Number(d1));

  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

export function addDaysFromNow(days: number) {
  const result = new Date();

  result.setDate(result.getDate() + days);

  return result;
}
