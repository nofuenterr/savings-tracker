import type {
  ChangeEvent,
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute,
} from 'react';
import { twMerge } from 'tailwind-merge';

import ErrorMessage from './ErrorMessage';

type InputMode =
  | 'email'
  | 'search'
  | 'tel'
  | 'text'
  | 'url'
  | 'none'
  | 'numeric'
  | 'decimal';

interface InputBlockProps {
  label: string;
  type: HTMLInputTypeAttribute;
  required?: boolean;
  autoFocus?: boolean;
  id: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
  min?: string | number;
  inputMode?: InputMode;
  pattern?: string;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  spellCheck?: boolean;
  className?: string;
  errorMessage: string | null;
  icon?: string;
}

export default function InputBlock({
  label,
  type = 'text',
  required,
  autoFocus = false,
  id,
  name,
  value,
  onChange,
  placeholder,
  maxLength,
  min,
  inputMode,
  pattern,
  autoComplete = 'off',
  spellCheck = false,
  className,
  errorMessage,
  icon,
}: InputBlockProps) {
  return (
    <div className="relative grid gap-125">
      <label htmlFor={id}>
        {label}
        {required ? <span className="text-red-500">*</span> : null}
      </label>
      {icon && (
        <img
          className="pointer-events-none absolute top-13 left-200"
          src={icon}
          alt=""
        />
      )}
      <input
        type={type}
        required={required}
        autoFocus={autoFocus}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        min={min}
        inputMode={inputMode}
        pattern={pattern}
        autoComplete={autoComplete}
        spellCheck={spellCheck}
        className={twMerge(
          'rounded-8 min-w-0 border border-neutral-500 bg-neutral-700 p-200',
          className,
        )}
      />
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
    </div>
  );
}
