import { z } from 'zod';

export const categorySchema = z.object({
  title: z.string().nonempty({
    message: 'Чтобы изменить категорию, вы должны ввести название'
  }),
  emoji: z.string()
});

export type CategoryBody = z.infer<typeof categorySchema>;
