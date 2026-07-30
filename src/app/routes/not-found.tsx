import { Link } from 'react-router-dom';

import { paths } from '@/config/paths';

export default function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-4 py-10 text-foreground">
      <section className="w-full max-w-xl rounded-3xl border border-border bg-card/90 p-8 text-center shadow-2xl shadow-black/15 backdrop-blur-xl">
        <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
          404
        </span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-card-foreground">Pagina no encontrada</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          La ruta que pediste no existe dentro de esta base.
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
            to={paths.home.getHref()}
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}
