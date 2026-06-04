import segmentPattern from '../../../assets/images/pattern-segment.svg';

export function ProgressBar({ progress }: { progress: number }) {
  const progressColor =
    progress >= 100
      ? 'var(--color-green-500)'
      : progress > 0
        ? 'var(--color-orange-400)'
        : 'var(--color-neutral-400)';

  const progressWidth = `${progress >= 100 ? 100 : progress}%`;

  const progressDisplay = progress > 0 ? 'block' : 'none';

  return (
    <div className="h-3 w-full overflow-hidden rounded-[40px] bg-neutral-700">
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

export function ProgressText({ progress }: { progress: number }) {
  const progressColor =
    progress >= 100
      ? 'var(--color-green-500)'
      : progress > 0
        ? 'var(--color-orange-400)'
        : 'var(--color-neutral-400)';

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
