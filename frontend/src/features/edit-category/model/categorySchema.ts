import { z } from 'zod';

export const categorySchema = z.object({
  title: z
    .string()
    .nonempty({
      message: 'Чтобы изменить категорию, вы должны ввести название'
    })
    .max(20, {
      message: 'Максимальная длина названия не должна превышать 20 символов'
    }),
  emoji: z.string()
});

export type CategoryBody = z.infer<typeof categorySchema>;
