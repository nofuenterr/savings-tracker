import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import Header from '../features/dashboard/components/Header';

function DashboardLoading() {
  return <div>Loading dashboard...</div>;
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
