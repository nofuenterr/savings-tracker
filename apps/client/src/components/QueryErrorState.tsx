import type {
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query';

import errorIcon from '../assets/icons/icon-error.svg';
import ButtonPrimary from './ButtonPrimary';

interface QueryErrorStateProps<TData = unknown> {
  context?: string;
  message: string;
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<TData, Error>>;
}

export function QueryErrorState<TData>({
  context = 'content',
  message,
  refetch,
}: QueryErrorStateProps<TData>) {
  return (
    <div className="rounded-16 grid place-content-center place-items-center gap-400 border border-dashed border-neutral-600 px-200 py-500 text-center">
      <div className="grid max-w-lg place-items-center gap-250">
        {errorIcon && <img className="size-12" src={errorIcon} alt="" />}
        <h3 className="text-preset-2">
          An error has occurred while trying to load {context}
        </h3>
        {message && <p className="text-neutral-300">{message}</p>}
      </div>
      <ButtonPrimary onClick={() => refetch()} type="button" text="Retry" />
    </div>
  );
}
