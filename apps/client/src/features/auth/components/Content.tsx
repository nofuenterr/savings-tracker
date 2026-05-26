import type { ReactNode } from 'react';

interface ContentProps {
  header: ReactNode;
  main?: ReactNode; // temporary optional
}

export default function Content({ header, main }: ContentProps) {
  return (
    <div className="grid min-w-70 gap-400">
      {header}
      <hr className="h-px w-full text-neutral-700" />
      {main}
    </div>
  );
}
