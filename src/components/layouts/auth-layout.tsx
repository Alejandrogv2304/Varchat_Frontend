import { useEffect, type ReactNode } from 'react';

import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { ThemeToggle } from '@/components/theme-toggle';
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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.14),transparent_35%),var(--background)] px-4 py-10 text-foreground sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-md rounded-3xl border border-border bg-card/90 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <Link className="text-lg font-semibold tracking-wide text-card-foreground" to={paths.home.getHref()}>
            Bienvenido a Varchat
          </Link>
          <ThemeToggle />
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-card-foreground sm:text-4xl">
          {title}
        </h1>

        <div className="mt-6">{children}</div>
      </section>
    </main>
  );
}
