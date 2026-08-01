import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { AuthLayout } from '@/components/layouts';
import { paths } from '@/config/paths';
import { api } from '@/lib/api-client';
import { setAccessToken } from '@/lib/auth-session';
import { queryClient } from '@/lib/react-query';

import { loginSchema, type LoginForm } from './login.schema';

export default function LoginPage() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectTo = searchParams.get('redirectTo');
  const destination = redirectTo ? decodeURIComponent(redirectTo) : paths.app.dashboard.getHref();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      correo: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (formData: LoginForm) => {
      const response = await api.post('/auth/login', formData);
      return response.data;
    },
    onSuccess: async (data: { accessToken: string; user: { id: string; name: string; email: string; username: string } }) => {
      setAccessToken(data.accessToken);
      queryClient.setQueryData(['user'], data.user);
      navigate(destination, { replace: true });
    },
    onError: (error) => {
      let message = 'No se pudo iniciar sesión';

      if (isAxiosError(error)) {
        const responseMessage = error.response?.data?.message;

        if (Array.isArray(responseMessage)) {
          message = responseMessage.join(' ');
        } else if (typeof responseMessage === 'string') {
          message = responseMessage;
        }
      }

      setError('root', { type: 'server', message });
    },
  });

  const handleLogin = (formData: LoginForm) => {
    loginMutation.mutate(formData);
  };

  return (
    <AuthLayout title="Inicia sesión para continuar">
      <div className="rounded-2xl border border-border bg-card p-6 text-card-foreground">
       

        <form className="mt-6 space-y-5" onSubmit={handleSubmit(handleLogin)} noValidate>
          {errors.root?.message ? (
            <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {errors.root.message}
            </div>
          ) : null}

          <div className="space-y-2">
            <label htmlFor="correo" className="text-sm font-medium text-card-foreground">
              Correo electrónico
            </label>
            <input
              id="correo"
              type="email"
              placeholder="tuemail@correo.com"
              autoComplete="email"
              className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground hover:border-primary/60 focus:border-primary"
              {...register('correo')}
            />
            {errors.correo ? <p className="text-sm text-destructive">{errors.correo.message}</p> : null}
          </div>

          <div className="space-y-3">
            <label htmlFor="password" className="text-sm font-medium text-card-foreground">
              Contraseña
            </label>
            <div className="group mt-1 flex items-center gap-2 rounded-xl border border-input bg-background px-4 py-3 transition-colors hover:border-primary/60 focus-within:border-primary">
              <input
                id="password"
                type={visible ? 'text' : 'password'}
                placeholder="*******"
                autoComplete="current-password"
                className="w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setVisible((current) => !current)}
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {visible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password ? <p className="text-sm text-destructive">{errors.password.message}</p> : null}
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loginMutation.isPending ? <Loader2 size={18} className="animate-spin" /> : null}
            {loginMutation.isPending ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>

        <div className="mt-6 text-sm text-muted-foreground">
          <span>¿No tienes cuenta? </span>
          <Link className="font-semibold text-primary transition-colors hover:opacity-80" to={paths.auth.register.getHref()}>
            Regístrate
          </Link>
        </div>
         <div className="mt-6 text-sm text-muted-foreground">
          <span>Olvidaste </span>
          <Link className="font-semibold text-primary transition-colors hover:opacity-80" to={paths.auth.forgotPassword.getHref()}>
            tu contraseña?
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
