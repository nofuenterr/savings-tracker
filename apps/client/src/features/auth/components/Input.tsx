import type { ChangeEvent } from 'react';

interface InputProps {
  label: string;
  required?: boolean;
  type: string;
  name: string;
  placeholder?: string;
  value?: string; // temporary optional
  maxLength?: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  label,
  required = false,
  type,
  name,
  placeholder,
  value,
  maxLength,
  onChange,
}: InputProps) {
  return (
    <div className="grid gap-125">
      <label className="text-neutral-0 text-preset-5" htmlFor={name}>
        {label}
      </label>
      <input
        className="rounded-8 border border-neutral-500 bg-neutral-700 p-200"
        required={required}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
      />
    </div>
  );
}
