import { useRef } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

import { useElementSize } from '../../hooks/useElementSize';
import type { GetDashboardResponse } from '../../types/dashboardType';

interface ChartDataPoint {
  month: Date;
  net: number;
}

function formatMonth(value: unknown): string {
  return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
    new Date(value as string),
  );
}

function formatBarLabel(value: number | null): string {
  if (value === null) return '';
  const abs = Math.abs(value);
  if (abs >= 1000) return `$${(abs / 1000).toFixed(1)}k`;
  return `$${abs.toFixed(0)}`;
}

export default function SavingsChart({
  dataset,
}: {
  dataset: GetDashboardResponse['monthlyActivity'];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width = 600 } = useElementSize(containerRef);

  const chartData: ChartDataPoint[] = dataset.map((d) => ({
    month: d.month,
    net: Number(d.deposits) - Number(d.withdrawals),
  }));

  const visibleCount =
    width <= 320
      ? 3
      : width <= 384
        ? 4
        : width <= 480
          ? 5
          : width <= 768
            ? 6
            : width <= 1024
              ? 9
              : 12;
  const visibleData = chartData.slice(-visibleCount);

  const netValues = visibleData.map((d) => d.net);
  const maxVal = Math.max(...netValues, 0);
  const minVal = Math.min(...netValues, 0);
  const padding = Math.max(Math.abs(maxVal), Math.abs(minVal)) * 0.2 || 100;
  const yMax = Math.ceil((maxVal + padding) / 100) * 100;
  const yMin = Math.floor((minVal - padding) / 100) * 100;

  return (
    <div ref={containerRef} className="w-full">
      <BarChart
        dataset={visibleData as unknown as readonly Record<string, unknown>[]}
        xAxis={[
          {
            dataKey: 'month',
            valueFormatter: formatMonth,
            tickLabelStyle: { fill: 'var(--color-neutral-0)', fontSize: 16 },
            tickSize: 0,
            disableLine: true,
          },
        ]}
        yAxis={[
          {
            colorMap: {
              type: 'continuous',
              min: yMin,
              max: yMax,
              color: ['hsl(14, 100%, 57%)', 'hsl(142, 69%, 58%)'],
            },

            min: yMin,
            max: yMax,
            tickLabelStyle: { display: 'none' },
            tickSize: 0,
            disableLine: true,
            disableTicks: true,
            width: 0,
          },
        ]}
        series={[
          {
            dataKey: 'net',
            valueFormatter: (v) => formatBarLabel(v),
            barLabel: (item) => formatBarLabel(item.value as number),
            barLabelPlacement: 'outside',
          },
        ]}
        height={300}
        grid={{ horizontal: true }}
        borderRadius={8}
        sx={{
          '& .MuiChartsGrid-line': {
            stroke: 'var(--color-neutral-700)',
            strokeDasharray: '4 4',
          },
          '& .MuiBarChart-label': {
            fill: 'var(--color-neutral-300)',
            fontSize: '14px',
          },
          '& .MuiChartsAxis-left': {
            display: 'none',
          },
        }}
      />
    </div>
  );
}
