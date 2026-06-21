import type { Dispatch } from 'react';
import { pdf } from '@react-pdf/renderer';

import type { GoalDetailsPDFProps } from '../types/dashboardType';
import GoalDetailsPDF from '../components/goal-details/GoalDetailsPDF';

export default async function handleDownloadGoalDetailsPDF({
  goal,
  transactions,
  projection,
  setIsDownloading,
}: GoalDetailsPDFProps & {
  setIsDownloading: Dispatch<React.SetStateAction<boolean>>;
}) {
  setIsDownloading(true);
  try {
    const blob = await pdf(
      <GoalDetailsPDF
        goal={goal}
        transactions={transactions}
        projection={projection}
      />,
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${goal.goal_name}-savings-report.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Failed to generate PDF:', err);
  } finally {
    setIsDownloading(false);
  }
}
