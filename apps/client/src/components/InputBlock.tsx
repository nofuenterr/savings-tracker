import type {
  ChangeEvent,
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute,
} from 'react';
import { useFormContext } from 'react-hook-form';
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
  fieldName?: string;
  label: string;
  type: HTMLInputTypeAttribute;
  required?: boolean;
  autoFocus?: boolean;
  id: string;
  name: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
  min?: string | number;
  inputMode?: InputMode;
  pattern?: string;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  spellCheck?: boolean;
  className?: string;
  errorMessage?: string | null;
  errorMessages?: string[] | null;
  icon?: string;
}

export default function InputBlock({
  fieldName,
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
  errorMessages,
  icon,
}: InputBlockProps) {
  const context = useFormContext();

  let registration = {};
  let fieldError: string | undefined;

  if (context && fieldName) {
    const {
      register,
      formState: { errors },
    } = context;
    registration = register(fieldName);

    if (!errorMessages || errorMessages.length === 0) {
      const errorTarget = fieldName
        .split('.')
        .reduce((obj, key) => (obj as any)?.[key], errors);
      fieldError = (errorTarget as any)?.message;
    }
  }

  const hasActiveError =
    !!fieldError ||
    !!errorMessage ||
    (errorMessages && errorMessages.length > 0);

  return (
    <div className="relative grid gap-125">
      <label htmlFor={id} className="text-preset-6 text-neutral-300">
        {label}
        {required && <span className="ml-050 text-red-500">*</span>}
      </label>

      <div className="relative w-full min-w-0">
        {icon && (
          <img
            className="pointer-events-none absolute top-1/2 left-200 size-200 -translate-y-1/2"
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
          placeholder={placeholder}
          maxLength={maxLength}
          min={min}
          inputMode={inputMode}
          pattern={pattern}
          autoComplete={autoComplete}
          spellCheck={spellCheck}
          className={twMerge(
            'rounded-8 w-full min-w-0 border bg-neutral-700 p-200 transition-colors outline-none',
            icon ? 'pl-500' : '',
            hasActiveError
              ? 'border-red-500'
              : 'border-neutral-500 focus:border-orange-400',
            className,
          )}
          {...registration}
          value={value ?? (registration as any).value}
          onChange={(e) => {
            (registration as any).onChange?.(e);
            onChange?.(e);
          }}
        />
      </div>

      {fieldError && <ErrorMessage errorMessage={fieldError} />}
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      {errorMessages?.map((message, index) => (
        <ErrorMessage key={`${index}-${message}`} errorMessage={message} />
      ))}
    </div>
  );
}
