import { Navigate } from 'react-router-dom';

import { useGetCurrentUser } from '../features/auth/api/authHooks';

export default function Root() {
  const { data: user, isLoading } = useGetCurrentUser();

  if (isLoading) return null;

  return <Navigate to={user ? '/dashboard' : '/auth/login'} replace />;
}
