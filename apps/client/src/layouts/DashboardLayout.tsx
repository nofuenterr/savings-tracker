import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

function DashboardLoading() {
  return <div>Loading dashboard...</div>;
}

export default function DashboardLayout() {
  return (
    <div>
      {/* your sidebar, header, etc. here */}
      <Suspense fallback={<DashboardLoading />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
