import starPattern from '../../../assets/images/pattern-star.svg';

interface QuoteSectionProps {
  quote: string;
  author: string;
}

export default function QuoteSection({ quote, author }: QuoteSectionProps) {
  return (
    <div
      style={{
        backgroundImage: `url("${starPattern}"), linear-gradient(to right, var(--color-orange-400), var(--color-orange-700))`,
        backgroundSize: '464px 464px, cover',
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundPosition: 'calc(100% + 98px) calc(100% + 98px), center',
      }}
      className="rounded-16 text-neutral-0 hidden h-full max-h-240 max-w-[37.5rem] min-w-75 place-content-center px-500 py-250 lg:grid"
    >
      <p className="text-preset-1">"{quote}"</p>
      <p className="text-preset-4 absolute bottom-500 left-500">— {author}</p>
    </div>
  );
}
