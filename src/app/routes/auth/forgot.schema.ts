import { z } from 'zod';

export const forgotSchema = z.object({
  correo: z.string().trim().min(1, 'El correo es obligatorio').email('El correo no es válido')
});

export type ForgotPasswordForm = z.infer<typeof forgotSchema>;
