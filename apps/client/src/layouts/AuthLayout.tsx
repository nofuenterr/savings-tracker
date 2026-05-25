import { Navigate, Outlet } from 'react-router-dom';

import { useGetCurrentUser } from '../features/auth/api/authHooks';

export default function AuthLayout() {
  const { data: user, isLoading } = useGetCurrentUser();

  if (isLoading) return null;

  if (user) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}
