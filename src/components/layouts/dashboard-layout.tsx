import type { PropsWithChildren } from 'react';

import { Link, NavLink, Outlet } from 'react-router-dom';

import { paths } from '@/config/paths';

export function DashboardLayout({ children }: PropsWithChildren) {
  const content = children ?? <Outlet />;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="border-b border-white/10 bg-slate-900/95 px-6 py-6 lg:border-b-0 lg:border-r lg:border-white/10">
        <Link className="text-lg font-semibold tracking-wide text-white" to={paths.home.getHref()}>
          Varchat
        </Link>
        <p className="mt-2 text-sm text-slate-400">Area protegida</p>
        <nav className="mt-6 grid gap-2">
          <NavLink
            end
            className={({ isActive }) =>
              [
                'rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sky-500/15 text-white ring-1 ring-sky-400/20'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white',
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
                  ? 'bg-sky-500/15 text-white ring-1 ring-sky-400/20'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white',
              ].join(' ')
            }
            to={paths.app.profile.getHref()}
          >
            Profile
          </NavLink>
        </nav>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-slate-950/80 px-6 py-5 backdrop-blur-xl">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-sky-300">
              Protected routes
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-white">
              Base de app
            </h2>
          </div>
          <Link
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
            to={paths.home.getHref()}
          >
            Public home
          </Link>
        </header>
        <main className="grid gap-6 px-6 py-6">{content}</main>
      </div>
    </div>
  );
}