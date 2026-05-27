import { Link, useLocation } from 'react-router-dom';

import chevronLeftIcon from '../../../../assets/icons/icon-chevron-left.svg';
import { useForgotPassword } from '../../api/authHooks';

interface LocationState {
  email?: string;
}

export default function EmailSentMain() {
  const location = useLocation();
  const sendResetLink = useForgotPassword();

  const state = location.state as LocationState;
  const email = state?.email;

  return (
    <main className="text-preset-5 grid gap-400">
      <p>The link expires in 30 minutes.</p>

      <button className="cursor-pointer rounded-full border border-neutral-600 bg-neutral-800 px-250 py-150 hover:bg-neutral-700">
        Open email app
      </button>

      <div className="grid gap-200">
        {email && (
          <p>
            <span className="text-neutral-300">Didn't receive it?</span>{' '}
            <button
              onClick={() => sendResetLink.mutate({ email })}
              className="cursor-pointer underline hover:opacity-90"
            >
              Resend email
            </button>{' '}
          </p>
        )}

        <Link
          className="group flex items-center gap-150 rounded-full text-neutral-300"
          to="/auth/register"
        >
          {chevronLeftIcon && <img src={chevronLeftIcon} alt="" />}
          <span className="group-hover:opacity-90">Back to sign in</span>
        </Link>
      </div>
    </main>
  );
}
