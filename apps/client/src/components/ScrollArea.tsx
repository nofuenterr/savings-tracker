import type { ReactNode, Ref } from 'react';
import { ScrollArea } from 'radix-ui';
import { twMerge } from 'tailwind-merge';

interface ScrollAreaRootProps {
  children: ReactNode;
  rootClassName?: string;
  viewportClassName?: string;
  scrollbarClassName?: string;
  viewportRef?: Ref<HTMLDivElement>;
}

export default function ScrollAreaRoot({
  children,
  rootClassName,
  viewportClassName,
  scrollbarClassName,
  viewportRef,
}: ScrollAreaRootProps) {
  return (
    <ScrollArea.Root
      className={twMerge(
        'h-full min-h-0 flex-1 overflow-visible',
        rootClassName,
      )}
    >
      <ScrollArea.Viewport
        ref={viewportRef}
        className={twMerge('h-full w-full flex-1', viewportClassName)}
      >
        {children}
      </ScrollArea.Viewport>

      <ScrollArea.Scrollbar
        className={twMerge(
          'p-025 flex w-125 touch-none bg-neutral-800 transition-[background] duration-150 ease-out select-none hover:bg-neutral-700',
          scrollbarClassName,
        )}
        orientation="vertical"
      >
        <ScrollArea.Thumb className="relative flex-1 rounded-full bg-neutral-500 before:absolute before:top-1/2 before:left-1/2 before:h-full before:min-h-11 before:w-full before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
      </ScrollArea.Scrollbar>

      <ScrollArea.Corner className="bg-neutral-800" />
    </ScrollArea.Root>
  );
}
