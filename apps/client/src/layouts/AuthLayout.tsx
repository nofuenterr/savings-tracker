import { Navigate, Outlet } from 'react-router-dom';

import { useGetCurrentUser } from '../features/auth/api/authHooks';

export default function AuthLayout() {
  const { data: user, isLoading } = useGetCurrentUser();

  if (isLoading) return null;

  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="2xs:p-300 xs:p-400 grid min-h-dvh items-center gap-1000 p-200 sm:p-600 md:p-800 lg:grid-cols-2 lg:py-500 lg:pr-1000 lg:pl-500">
      <Outlet />
    </div>
  );
}
