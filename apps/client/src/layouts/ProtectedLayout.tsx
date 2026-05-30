import { Navigate, Outlet } from 'react-router-dom';

import { useGetCurrentUser } from '../features/auth/api/authHooks';
import { LoadingSpinner } from '../components/LoadingSpinner';

export default function ProtectedLayout() {
  const { data: user, isLoading } = useGetCurrentUser();

  if (isLoading)
    return <LoadingSpinner variant="fullscreen" label="Verifying user..." />;

  if (!user) return <Navigate to="/auth/login" replace />;

  return <Outlet />;
}
