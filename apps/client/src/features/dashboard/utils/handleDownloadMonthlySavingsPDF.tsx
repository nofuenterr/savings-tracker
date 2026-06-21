import type { Dispatch } from 'react';
import { pdf } from '@react-pdf/renderer';

import type { MonthlySavingsPDFProps } from '../types/dashboardType';
import MonthlySavingsPDF from '../components/goal-details/MonthlySavingsPDF';

export default async function handleDownloadMonthlySavingsPDF({
  monthlyActivity,
  setIsDownloading,
}: MonthlySavingsPDFProps & {
  setIsDownloading: Dispatch<React.SetStateAction<boolean>>;
}) {
  setIsDownloading(true);
  try {
    const blob = await pdf(
      <MonthlySavingsPDF monthlyActivity={monthlyActivity} />,
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `monthly-savings-report-${Date.now()}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Failed to generate PDF:', err);
  } finally {
    setIsDownloading(false);
  }
}
