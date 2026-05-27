import type { ChangeEvent } from 'react';

import ErrorMessage from './ErrorMessage';

interface InputProps {
  label: string;
  required?: boolean;
  autoFocus?: boolean;
  type: string;
  name: string;
  placeholder?: string;
  value: string;
  maxLength?: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
}

export default function Input({
  label,
  required,
  autoFocus,
  type,
  name,
  placeholder,
  value,
  maxLength,
  onChange,
  error,
}: InputProps) {
  return (
    <div className="grid gap-125">
      <label className="text-neutral-0 text-preset-5" htmlFor={name}>
        {label}
      </label>
      <input
        className="rounded-8 border border-neutral-500 bg-neutral-700 p-200"
        required={required}
        autoFocus={autoFocus}
        spellCheck={false}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
      />
      {error && <ErrorMessage errorMessage={error} />}
    </div>
  );
}
