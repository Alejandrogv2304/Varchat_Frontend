import { Link } from 'react-router-dom';

import { paths } from '@/config/paths';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.18),transparent_30%),#020617] px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-6xl rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)] lg:items-stretch">
          <div>
            <span className="inline-flex rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-sky-100">
              React + Vite + React Router
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Varchat ya tiene base de rutas publicas y protegidas.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
              El proyecto queda separado como en Bulletproof React: rutas publicas, area protegida y layouts reutilizables.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-400"
                to={paths.auth.login.getHref()}
              >
                Ir a login
              </Link>
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
                to={paths.app.dashboard.getHref()}
              >
                Ver area protegida
              </Link>
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
            <p className="inline-flex rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-sky-100">
              Lo que ya quedo listo
            </p>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-200">
              <li>Home publica</li>
              <li>Auth layout para login y registro</li>
              <li>Dashboard layout para rutas protegidas</li>
              <li>Guard de acceso con React Query</li>
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}