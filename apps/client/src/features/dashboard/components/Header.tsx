import BrandLogo from '../../../components/BrandLogo';
import ButtonPrimary from '../../../components/ButtonPrimary';

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between py-150 md:py-200">
      <BrandLogo hideTextOnMobile={true} />
      <ButtonPrimary type="button" text="+ New goal" />
    </header>
  );
}
