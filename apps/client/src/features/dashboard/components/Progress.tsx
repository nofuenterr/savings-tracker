import segmentPattern from '../../../assets/images/pattern-segment.svg';

function getProgressColor({
  progress,
  isGradientCard,
}: {
  progress: number;
  isGradientCard?: boolean;
}) {
  if (progress >= 100) return 'var(--color-green-500)';
  if (progress > 0)
    return isGradientCard
      ? 'var(--color-neutral-0)'
      : 'var(--color-orange-400)';
  return isGradientCard
    ? 'var(--color-orange-800)'
    : 'var(--color-neutral-400)';
}

export function ProgressBar({
  progress,
  isGradientCard,
}: {
  progress: number;
  isGradientCard?: boolean;
}) {
  const barColor = isGradientCard
    ? 'var(--color-orange-800)'
    : 'var(--color-neutral-700)';

  const progressColor = getProgressColor({ progress, isGradientCard });

  const progressWidth = `${progress >= 100 ? 100 : progress}%`;

  const progressDisplay = progress > 0 ? 'block' : 'none';

  return (
    <div
      style={{ backgroundColor: barColor }}
      className="h-3 w-full overflow-hidden rounded-[40px]"
    >
      <div
        className="bg-neutral-0/30 rounded-8 h-full border"
        style={{
          backgroundColor: progressColor,
          width: progressWidth,
          display: progressDisplay,
          backgroundImage: `url("${segmentPattern}")`,
        }}
      ></div>
    </div>
  );
}

export function ProgressText({
  progress,
  isGradientCard,
}: {
  progress: number;
  isGradientCard?: boolean;
}) {
  const progressColor = getProgressColor({ progress, isGradientCard });

  return (
    <p
      className={`text-preset-1-mobile md:text-preset-1`}
      style={{
        color: progressColor,
      }}
    >
      {progress.toFixed(2)}%
    </p>
  );
}
