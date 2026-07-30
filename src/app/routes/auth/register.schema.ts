import { z } from 'zod';

export const registerSchema = z.object({
  correo: z.string().trim().min(1, 'El correo es obligatorio').email('El correo no es válido'),
  username: z.string().trim().min(3, 'El nombre de usuario es obligatorio').max(23, 'El nombre de usuario no puede tener más de 23 caracteres'),
  nombre: z.string().trim().min(1, 'El nombre es obligatorio').max(50, 'El nombre no puede tener más de 50 caracteres'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});

export type RegisterForm = z.infer<typeof registerSchema>;
