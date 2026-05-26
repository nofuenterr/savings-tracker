interface QuoteSectionProps {
  quote: string;
  author: string;
}

export default function QuoteSection({ quote, author }: QuoteSectionProps) {
  return (
    <div className="rounded-16 text-neutral-0 relative hidden h-full max-h-240 max-w-[37.5rem] min-w-75 place-content-center bg-linear-90 from-orange-400 to-orange-700 px-500 py-250 lg:grid">
      <p className="text-preset-1">"{quote}"</p>
      <p className="text-preset-4 absolute bottom-500 left-500">— {author}</p>
    </div>
  );
}
