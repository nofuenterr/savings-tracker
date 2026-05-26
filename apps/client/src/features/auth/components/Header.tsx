import BrandLogo from '../../../components/BrandLogo';

interface HeaderProps {
  title: string;
  description: string;
}

export default function Header({ title, description }: HeaderProps) {
  return (
    <header className="grid gap-500">
      <BrandLogo />
      <div className="grid gap-100">
        <h1 className="text-preset-2 text-neutral-0">{title}</h1>
        <p className="text-preset-5 text-neutral-300">{description}</p>
      </div>
    </header>
  );
}
