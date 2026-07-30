import { z } from 'zod';

export const loginSchema = z.object({
  correo: z.string().trim().min(1, 'El correo es obligatorio').email('El correo no es válido'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});

export type LoginForm = z.infer<typeof loginSchema>;
