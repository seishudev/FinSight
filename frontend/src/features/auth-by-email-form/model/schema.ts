import { z } from 'zod';

export const schema = z.object({
  email: z.string().email({ message: 'Неправильный формат почты' }),
  password: z
    .string()
    .min(6, { message: 'Пароль слишком короткий' })
    .max(32, { message: 'Пароль слишком длинный' })
});

export type AuthByEmailFormData = z.infer<typeof schema>;
