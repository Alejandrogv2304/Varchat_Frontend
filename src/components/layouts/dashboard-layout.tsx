import type { PropsWithChildren } from 'react';

import { Link, NavLink, Outlet } from 'react-router-dom';

import { ThemeToggle } from '@/components/theme-toggle';
import { paths } from '@/config/paths';

export function DashboardLayout({ children }: PropsWithChildren) {
  const content = children ?? <Outlet />;

  return (
    <div className="min-h-screen bg-background text-foreground lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="border-b border-border bg-card/95 px-6 py-6 lg:border-b-0 lg:border-r">
        <Link className="text-lg font-semibold tracking-wide text-card-foreground" to={paths.home.getHref()}>
          Varchat
        </Link>
        <p className="mt-2 text-sm text-muted-foreground">Area protegida</p>
        <nav className="mt-6 grid gap-2">
          <NavLink
            end
            className={({ isActive }) =>
              [
                'rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/15 text-foreground ring-1 ring-primary/20'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              ].join(' ')
            }
            to={paths.app.dashboard.getHref()}
          >
            Dashboard
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              [
                'rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/15 text-foreground ring-1 ring-primary/20'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              ].join(' ')
            }
            to={paths.app.profile.getHref()}
          >
            Profile
          </NavLink>
        </nav>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border bg-background/80 px-6 py-5 backdrop-blur-xl">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-primary">
              Protected routes
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
              Base de app
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              to={paths.home.getHref()}
            >
              Public home
            </Link>
          </div>
        </header>
        <main className="grid gap-6 px-6 py-6">{content}</main>
      </div>
    </div>
  );
}
