import { z } from 'zod';

export const schema = z
  .object({
    email: z.string().email({ message: 'Неправильный формат почты' }),
    password: z
      .string()
      .min(6, { message: 'Пароль слишком короткий' })
      .max(32, { message: 'Пароль слишком длинный' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Подтверждение пароля слишком короткое' })
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword']
  });

export type RegisterByEmailFormData = z.infer<typeof schema>;
