import { useEffect, type ReactNode } from 'react';

import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';

type AuthLayoutProps = {
  title: string;
  children: ReactNode;
};

export function AuthLayout({ title, children }: AuthLayoutProps) {
  const user = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  useEffect(() => {
    if (user.data) {
      navigate(
        redirectTo ? decodeURIComponent(redirectTo) : paths.app.dashboard.getHref(),
        { replace: true },
      );
    }
  }, [navigate, redirectTo, user.data]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <Link className="text-lg font-semibold tracking-wide text-white" to={paths.home.getHref()}>
            Varchat
          </Link>
          <p className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-sky-100">
            Public route
          </p>
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-sm leading-6 text-slate-300">
          Esta ruta es pública. Cuando conectes tu auth real, aquí irá el login o el registro.
        </p>
        <div className="mt-6">{children}</div>
      </section>
    </main>
  );
}