interface LoadingSpinnerProps {
  variant?: 'fullscreen' | 'component';
  size?: string;
  color?: string;
  label?: string;
}

export function LoadingSpinner({
  variant = 'component',
  size = 'size-12',
  color = 'border-orange-500',
  label,
}: LoadingSpinnerProps) {
  return (
    <div
      className={`grid place-content-center place-items-center gap-300 ${
        variant === 'fullscreen'
          ? 'fixed inset-0 z-50 h-dvh w-full bg-neutral-900/80 backdrop-blur-sm'
          : 'h-full min-h-50 w-full p-500'
      }`}
    >
      <div
        className={`animate-spin rounded-full border-4 border-neutral-700 ${color} ${size}`}
        style={{ borderTopColor: 'transparent' }}
        role="status"
        aria-label="loading"
      />

      {label && (
        <p className="text-preset-5 animate-pulse font-medium tracking-wide text-neutral-300">
          {label}
        </p>
      )}
    </div>
  );
}
