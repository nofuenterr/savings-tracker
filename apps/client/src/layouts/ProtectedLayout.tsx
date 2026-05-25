import { Navigate, Outlet } from 'react-router-dom';
import { useGetCurrentUser } from '../features/auth/api/authHooks';

export default function ProtectedLayout() {
  const { data: user, isLoading } = useGetCurrentUser();

  if (isLoading) return null; // or a spinner

  if (!user) return <Navigate to="/auth/login" replace />;

  return <Outlet />;
}
