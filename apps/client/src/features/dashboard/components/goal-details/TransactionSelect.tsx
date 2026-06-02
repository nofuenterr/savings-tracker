import { Select } from 'radix-ui';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';

import type { TransactionType } from '@savings-tracker/shared';

interface TransactionSelectProps {
  value: TransactionType;
  onValueChange: (value: TransactionType) => void;
}

export default function TransactionSelect({
  value,
  onValueChange,
}: TransactionSelectProps) {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger className="rounded-8 inline-flex w-full min-w-0 border border-neutral-500 bg-neutral-700 p-200 outline-none">
        <span className="min-w-0 flex-1 truncate text-start">
          <Select.Value />
        </span>
        <Select.Icon className="shrink-0">
          <ChevronDownIcon className="size-250" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          className="rounded-8 z-100 min-w-(--radix-select-trigger-width) overflow-hidden border border-neutral-500 bg-neutral-800 p-100"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <Select.ScrollUpButton className="flex h-250 cursor-default items-center justify-center bg-neutral-500">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="gap-050 grid">
            <Select.Item
              key="deposit"
              value="deposit"
              className="rounded-6 relative w-full cursor-pointer p-100 outline-none select-none focus:ring-0 focus:outline-none data-highlighted:bg-neutral-700"
            >
              <Select.ItemText asChild>
                <span className="block min-w-0 flex-1 truncate">Deposit</span>
              </Select.ItemText>
              <Select.ItemIndicator className="absolute top-100 right-100 shrink-0">
                <CheckIcon className="size-250" />
              </Select.ItemIndicator>
            </Select.Item>

            <Select.Item
              key="withdrawal"
              value="withdrawal"
              className="rounded-6 relative w-full cursor-pointer p-100 outline-none select-none focus:ring-0 focus:outline-none data-highlighted:bg-neutral-700"
            >
              <Select.ItemText asChild>
                <span className="block min-w-0 flex-1 truncate">
                  Withdrawal
                </span>
              </Select.ItemText>
              <Select.ItemIndicator className="absolute top-100 right-100 shrink-0">
                <CheckIcon className="size-250" />
              </Select.ItemIndicator>
            </Select.Item>
          </Select.Viewport>

          <Select.ScrollUpButton className="flex h-250 cursor-default items-center justify-center bg-neutral-500">
            <ChevronDownIcon />
          </Select.ScrollUpButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
