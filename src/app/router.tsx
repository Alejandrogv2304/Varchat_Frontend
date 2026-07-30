import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { paths } from '@/config/paths';
import { ProtectedRoute } from '@/lib/auth';

import LoginPage from './routes/auth/login';
import RegisterPage from './routes/auth/register';
import AppRoot from './routes/app/root';
import DashboardPage from './routes/app/dashboard';
import ProfilePage from './routes/app/profile';
import HomePage from './routes/home';
import NotFoundPage from './routes/not-found';

const router = createBrowserRouter([
  {
    path: paths.home.path,
    element: <HomePage />,
  },
  {
    path: paths.auth.login.path,
    element: <LoginPage />,
  },
  {
    path: paths.auth.register.path,
    element: <RegisterPage />,
  },
  {
    path: paths.app.root.path,
    element: (
      <ProtectedRoute>
        <AppRoot />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: paths.app.profile.path,
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}