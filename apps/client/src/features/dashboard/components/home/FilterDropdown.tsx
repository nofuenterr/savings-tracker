import { type ReactNode } from 'react';
import { DropdownMenu } from 'radix-ui';

import type { GoalStatus } from '@savings-tracker/shared';

interface FilterDropdownProps {
  children: ReactNode;
  currentFilter: GoalStatus;
  onFilterChange: (value: GoalStatus) => void;
}

export default function FilterDropdown({
  children,
  currentFilter,
  onFilterChange,
}: FilterDropdownProps) {
  const handleFilterChange = (value: string) => {
    onFilterChange(value as GoalStatus);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="rounded-8 min-w-45 border border-neutral-600 bg-neutral-800 p-100 shadow-lg"
          sideOffset={8}
          align="end"
        >
          <DropdownMenu.Label className="text-preset-6 p-100 text-neutral-300 uppercase">
            Filter by status
          </DropdownMenu.Label>
          <DropdownMenu.RadioGroup
            value={currentFilter}
            onValueChange={handleFilterChange}
          >
            <RadioItem value="all" text="All goals" />
            <RadioItem value="inProgress" text="In progress" />
            <RadioItem value="completed" text="Completed" />
            <RadioItem value="notStarted" text="Not started" />
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function RadioItem({ value, text }: { value: GoalStatus; text: string }) {
  return (
    <DropdownMenu.RadioItem
      value={value}
      className="data-[state=checked]:text-neutral-0 rounded-6 relative flex h-500 cursor-pointer items-center gap-100 pr-100 pl-400 text-neutral-100 text-neutral-300 outline-none select-none data-highlighted:bg-neutral-700"
    >
      <div className="absolute left-100 grid size-200 place-content-center rounded-full border border-neutral-500 transition-colors">
        <DropdownMenu.ItemIndicator className="flex items-center justify-center">
          <div className="size-100 rounded-full bg-orange-400" />
        </DropdownMenu.ItemIndicator>
      </div>
      <span>{text}</span>
    </DropdownMenu.RadioItem>
  );
}
