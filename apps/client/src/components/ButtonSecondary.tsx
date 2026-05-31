import { twMerge } from 'tailwind-merge';

interface ButtonSecondaryProps {
  disabled?: boolean;
  type: 'button' | 'submit' | 'reset';
  text: string;
  onClick?: () => void;
  ariaLabel: string;
  className?: string;
}

export default function ButtonSecondary({
  onClick,
  disabled = false,
  type = 'button',
  text,
  ariaLabel,
  className,
}: ButtonSecondaryProps) {
  return (
    <button
      className={twMerge(
        'cursor-pointer rounded-full border border-neutral-600 bg-neutral-700 px-250 py-150 hover:bg-neutral-600 disabled:bg-neutral-800 disabled:text-neutral-600',
        className,
      )}
      disabled={disabled}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {text}
    </button>
  );
}
