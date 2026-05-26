import { Link } from 'react-router-dom';

import logo from '../assets/icons/logo-small.svg';

export default function BrandLogo() {
  return (
    <Link to="/" className="w-max rounded-full">
      <div className="flex w-max items-center gap-125">
        <img src={logo} alt="Brand logo" />
        <span className="text-neutral-0 text-preset-3">Savings Tracker</span>
      </div>
    </Link>
  );
}
