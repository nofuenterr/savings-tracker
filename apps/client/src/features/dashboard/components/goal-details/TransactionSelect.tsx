import { Select } from 'radix-ui';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

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
            <SelectItem key="deposit" value="deposit" text="Deposit" />
            <SelectItem key="withdrawal" value="withdrawal" text="Withdrawal" />
          </Select.Viewport>

          <Select.ScrollUpButton className="flex h-250 cursor-default items-center justify-center bg-neutral-500">
            <ChevronDownIcon />
          </Select.ScrollUpButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

function SelectItem({ value, text }: { value: TransactionType; text: string }) {
  return (
    <Select.Item
      value={value}
      className="data-[state=checked]:text-neutral-0 rounded-6 relative flex h-500 cursor-pointer items-center gap-100 pr-100 pl-400 text-neutral-100 text-neutral-300 outline-none select-none data-highlighted:bg-neutral-700"
    >
      <div className="absolute left-100 grid size-200 place-content-center rounded-full border border-neutral-500 transition-colors">
        <Select.ItemIndicator className="flex items-center justify-center">
          <div className="size-100 rounded-full bg-orange-400" />
        </Select.ItemIndicator>
      </div>
      <Select.ItemText asChild>
        <span className="block min-w-0 flex-1 truncate">{text}</span>
      </Select.ItemText>
    </Select.Item>
  );
}
