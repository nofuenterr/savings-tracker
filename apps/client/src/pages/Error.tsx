import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom';

import errorIcon from '../assets/icons/icon-error.svg';
import ButtonPrimary from '../components/ButtonPrimary';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  const message = isRouteErrorResponse(error)
    ? error.statusText
    : error instanceof Error
      ? error.message
      : 'An error has occured';

  return (
    <div className="h-dvh w-full px-200 py-400 md:px-300 md:py-600 lg:px-1000">
      <div className="rounded-16 grid h-full place-content-center place-items-center gap-400 border border-dashed border-neutral-600 px-200 py-500 text-center">
        <div className="grid max-w-lg place-items-center gap-250">
          {errorIcon && <img className="size-12" src={errorIcon} alt="" />}
          <h1 className="text-preset-2">Something went wrong</h1>
          <p className="text-neutral-300">{message}</p>
        </div>
        <div className="grid gap-100">
          <ButtonPrimary
            onClick={() => navigate(-1)}
            type="button"
            text="Go back"
          />
          <ButtonPrimary
            onClick={() => navigate('/dashboard')}
            type="button"
            text="Go to dashboard"
          />
        </div>
      </div>
    </div>
  );
}
