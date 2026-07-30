import { Outlet } from 'react-router-dom';

import { DashboardLayout } from '@/components/layouts';

export default function AppRoot() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}