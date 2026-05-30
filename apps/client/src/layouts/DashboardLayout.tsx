import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import Header from '../features/dashboard/components/Header';
import { LoadingSpinner } from '../components/LoadingSpinner';

function DashboardLoading() {
  return <LoadingSpinner variant="fullscreen" label="Loading dashboard..." />;
}

export default function DashboardLayout() {
  return (
    <div className="px-200 md:px-300 lg:px-1000">
      <Header />
      <Suspense fallback={<DashboardLoading />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
