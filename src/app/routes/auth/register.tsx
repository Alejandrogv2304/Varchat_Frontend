import { Link } from 'react-router-dom';

import { AuthLayout } from '@/components/layouts';
import { paths } from '@/config/paths';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { useForm } from 'react-hook-form';
import { registerSchema } from './register.schema';
import type { RegisterForm } from './register.schema';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

type UsernameCheckResponse = {
  username: string;
  available: boolean;
  message: string;
};

export default function RegisterPage() {
  const [visible, setVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [debouncedUsername, setDebouncedUsername] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      correo: '',
      username: '',
      nombre: '',
      password: '',
    },
  });

  const usernameValue = watch('username');

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedUsername(usernameValue.trim());
    }, 1500);

    return () => window.clearTimeout(timeoutId);
  }, [usernameValue]);

  const usernameCheckQuery = useQuery({
    queryKey: ['username-check', debouncedUsername],
    queryFn: async (): Promise<UsernameCheckResponse> => {
      const response = await api.get('/users/check-username', {
        params: { username: debouncedUsername },
      });

      return response.data as UsernameCheckResponse;
    },
    enabled: debouncedUsername.length >= 3,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const registerMutation = useMutation({
    mutationFn: async (formData: RegisterForm) => {
      const response = await api.post('/auth/register', formData);
      return response.data;
    },
    onSuccess: (data: { message: string }) => {
      setSuccessMessage(data.message);
      reset({
        correo: '',
        username: '',
        nombre: '',
        password: '',
      });
    },
    onError: (error) => {
      let message = 'No se pudo registrar el usuario';

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

  const handleRegister = (formData: RegisterForm) => {
    registerMutation.mutate(formData);
  };
  return (
    
    <AuthLayout title="Crea tu cuenta">
      <div className="rounded-2xl border border-border bg-card p-6 text-card-foreground">
        {successMessage ? (
          <div
            className="rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-primary"
            role="status"
          >
            {successMessage}
          </div>
        ) : null}

        <form className="mt-6 space-y-5" onSubmit={handleSubmit(handleRegister)} noValidate>
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

          {/* Div del username */}
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-card-foreground">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="CharlieFlow"
              autoComplete="username"
              className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground hover:border-primary/60 focus:border-primary"
              {...register('username')}
            />
            {errors.username ? <p className="text-sm text-destructive">{errors.username.message}</p> : null}
            {usernameCheckQuery.data ? (
              <p
                className={`text-sm ${
                  usernameCheckQuery.data.available ? 'text-primary' : 'text-destructive'
                }`}
                role="status"
              >
                {usernameCheckQuery.data.message}
              </p>
            ) : null}
          </div>
          {/* Div del nombre */}

          <div className="space-y-2">
            <label htmlFor="nombre" className="text-sm font-medium text-card-foreground">
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              placeholder="Alejandro"
              autoComplete="name"
              className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground hover:border-primary/60 focus:border-primary"
              {...register('nombre')}
            />
            {errors.nombre ? <p className="text-sm text-destructive">{errors.nombre.message}</p> : null}
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
                autoComplete="new-password"
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
            disabled={registerMutation.isPending}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {registerMutation.isPending ? <Loader2 size={18} className="animate-spin" /> : null}
            {registerMutation.isPending ? 'Registrando...' : 'Registrar'}
          </button>
        </form>

        <div className="mt-6 text-sm text-muted-foreground">
          <span>¿Ya tienes cuenta? </span>
          <Link className="font-semibold text-primary transition-colors hover:opacity-80" to={paths.auth.login.getHref()}>
            Inicia sesión
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
