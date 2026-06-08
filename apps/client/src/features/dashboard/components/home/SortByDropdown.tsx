import { type ReactNode } from 'react';
import { DropdownMenu } from 'radix-ui';

import type { GoalSortKeys } from '@savings-tracker/shared';

import ScrollAreaRoot from '../../../../components/ScrollArea';

interface SortByDropdownProps {
  children: ReactNode;
  currentSort: GoalSortKeys;
  onSortChange: (value: GoalSortKeys) => void;
}

export default function SortByDropdown({
  children,
  currentSort,
  onSortChange,
}: SortByDropdownProps) {
  const handleSortChange = (value: string) => {
    onSortChange(value as GoalSortKeys);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="rounded-8 h-53 min-w-45 overflow-hidden border border-neutral-600 bg-neutral-800 shadow-lg"
          sideOffset={8}
          align="end"
        >
          <ScrollAreaRoot scrollbarClassName="w-100">
            <div className="py-100 pr-150 pl-100">
              <DropdownMenu.Label className="text-preset-6 p-100 text-neutral-300 uppercase">
                Sort by
              </DropdownMenu.Label>
              <DropdownMenu.RadioGroup
                value={currentSort}
                onValueChange={handleSortChange}
              >
                <RadioItem value="newest" text="Recently added" />
                <RadioItem value="oldest" text="Oldest" />
                <RadioItem
                  value="goal_target_desc"
                  text="Target amount (highest first)"
                />
                <RadioItem
                  value="goal_target_asc"
                  text="Target amount (lowest first)"
                />
                <RadioItem
                  value="deadline_desc"
                  text="Deadline (most recent first)"
                />
                <RadioItem
                  value="deadline_asc"
                  text="Deadline (oldest first)"
                />
                <RadioItem
                  value="progress_desc"
                  text="Progress (highest first)"
                />
                <RadioItem
                  value="progress_asc"
                  text="Progress (lowest first)"
                />
                <RadioItem
                  value="amount_saved_desc"
                  text="Amount saved (highest first)"
                />
                <RadioItem
                  value="amount_saved_asc"
                  text="Amount saved (lowest first)"
                />
                <RadioItem value="goal_name_asc" text="Alphabetical (A-Z)" />
                <RadioItem value="goal_name_desc" text="Alphabetical (Z-A)" />
              </DropdownMenu.RadioGroup>
            </div>
          </ScrollAreaRoot>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function RadioItem({ value, text }: { value: GoalSortKeys; text: string }) {
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
