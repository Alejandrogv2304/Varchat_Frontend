import { Link } from 'react-router-dom';

import { AuthLayout } from '@/components/layouts';
import { paths } from '@/config/paths';

export default function LoginPage() {
  return (
    <AuthLayout title="Log in to your account">
      <p className="text-sm leading-6 text-slate-300">
        Aqui conectaras tu formulario real de login cuando tengas el backend listo.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-400"
          to={paths.app.dashboard.getHref()}
        >
          Entrar al dashboard
        </Link>
        <Link
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
          to={paths.auth.register.getHref()}
        >
          Ir a registro
        </Link>
      </div>
    </AuthLayout>
  );
}