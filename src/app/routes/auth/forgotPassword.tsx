import { AuthLayout } from "@/components/layouts";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from "react-router-dom";
import { type ForgotPasswordForm, forgotSchema } from "./forgot.schema";
import { api } from "@/lib/api-client";
import { isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { paths } from "@/config/paths";

export default function ForgotPasswordPage() {
    const navigate = useNavigate();

      const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
      } = useForm<ForgotPasswordForm>({
        resolver: zodResolver(forgotSchema),
        defaultValues: {
          correo: ''
        },
      });

    const forgotMutation = useMutation({
    mutationFn: async (formData: ForgotPasswordForm) => {
      const response = await api.post('/auth/forgot-password', formData);
      return response.data;
    },
    onSuccess: () =>{
      navigate('/auth/login');
    },
    onError: (error) => {
      let message = 'No se pudo enviar el correo de recuperación';

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

  const handleForgotPassword = (formData: ForgotPasswordForm) => {
    forgotMutation.mutate(formData);
  };

    return(
        <AuthLayout title="Recupera tú contraseña">
        <div className="rounded-2xl border border-border bg-card p-6 text-card-foreground"> 

            <form className="mt-6 space-y-5" onSubmit={handleSubmit(handleForgotPassword)} noValidate>
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

          

          <button
            type="submit"
            disabled={forgotMutation.isPending}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {forgotMutation.isPending ? <Loader2 size={18} className="animate-spin" /> : null}
            {forgotMutation.isPending ? 'Enviando...' : 'Enviar'}
          </button>
        </form>

        <div className="mt-6 text-sm text-muted-foreground">
          <span>Vuelve al </span>
          <Link className="font-semibold text-primary transition-colors hover:opacity-80" to={paths.auth.login.getHref()}>
            Inicio de Sesión
          </Link>
        </div>

         
        </div>
        </AuthLayout>
    );
}