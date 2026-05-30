import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useGetCurrentUser } from '../features/auth/api/authHooks';
import { LoadingSpinner } from '../components/LoadingSpinner';

export default function AuthLayout() {
  const location = useLocation();

  const isResetRoute =
    location.pathname.includes('forgot-password') ||
    location.pathname.includes('email-sent') ||
    location.pathname.includes('verify-reset-token') ||
    location.pathname.includes('reset-password') ||
    location.pathname.includes('reset-password-success');

  const { data: user, isLoading } = useGetCurrentUser({
    enabled: !isResetRoute,
  });

  if (isResetRoute) {
    return (
      <div className="2xs:p-300 xs:p-400 grid min-h-dvh items-center gap-1000 p-200 sm:p-600 md:p-800 lg:grid-cols-2 lg:py-500 lg:pr-1000 lg:pl-500">
        <Outlet />
      </div>
    );
  }

  if (isLoading)
    return <LoadingSpinner variant="fullscreen" label="Verifying user..." />;

  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="2xs:p-300 xs:p-400 grid min-h-dvh items-center gap-1000 p-200 sm:p-600 md:p-800 lg:grid-cols-2 lg:py-500 lg:pr-1000 lg:pl-500">
      <Outlet />
    </div>
  );
}
