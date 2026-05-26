interface ButtonPrimaryProps {
  disabled?: boolean;
  type: 'button' | 'submit';
  text: string;
  onClick?: () => void;
}

export default function ButtonPrimary({
  onClick,
  disabled = false,
  type,
  text,
}: ButtonPrimaryProps) {
  return (
    <button
      className="grid cursor-pointer place-content-center rounded-full bg-orange-400 px-250 py-150 text-neutral-900 hover:bg-orange-500 disabled:bg-orange-800"
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
