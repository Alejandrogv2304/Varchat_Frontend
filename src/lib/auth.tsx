import type { ReactNode } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { paths } from '@/config/paths';

import { api } from './api-client';

export type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

const userQueryKey = ['user'] as const;

const getUser = async (): Promise<User> => {
  const response = await api.get('/auth/me');
  return response.data as User;
};

export const getUserQueryOptions = () => ({
  queryKey: userQueryKey,
  queryFn: getUser,
  retry: false,
  refetchOnWindowFocus: false,
});

export const useUser = () => useQuery(getUserQueryOptions());

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useUser();
  const location = useLocation();

  if (user.isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-950">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-sky-400"
          aria-label="Loading"
        />
      </div>
    );
  }

  if (!user.data) {
    return <Navigate to={paths.auth.login.getHref(location.pathname)} replace />;
  }

  return children;
};

export const useAppNavigation = () => {
  const navigate = useNavigate();

  return {
    goHome: () => navigate(paths.home.getHref()),
    goLogin: (redirectTo?: string | null) =>
      navigate(paths.auth.login.getHref(redirectTo)),
    goRegister: (redirectTo?: string | null) =>
      navigate(paths.auth.register.getHref(redirectTo)),
  };
};