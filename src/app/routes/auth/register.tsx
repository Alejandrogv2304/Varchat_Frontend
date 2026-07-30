import { Link } from 'react-router-dom';

import { AuthLayout } from '@/components/layouts';
import { paths } from '@/config/paths';

export default function RegisterPage() {
  return (
    <AuthLayout title="Create your account">
      <p className="text-sm leading-6 text-slate-300">
        Esta pagina queda lista para que despues montes el formulario de registro.
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
          to={paths.auth.login.getHref()}
        >
          Ya tengo cuenta
        </Link>
      </div>
    </AuthLayout>
  );
}