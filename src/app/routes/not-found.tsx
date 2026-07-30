import { Link } from 'react-router-dom';

import { paths } from '@/config/paths';

export default function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-4 py-10 text-slate-100">
      <section className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-center shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <span className="inline-flex rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-sky-100">
          404
        </span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white">Pagina no encontrada</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          La ruta que pediste no existe dentro de esta base.
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-400"
            to={paths.home.getHref()}
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}