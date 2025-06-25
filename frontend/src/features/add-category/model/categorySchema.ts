import { z } from 'zod';

export const categorySchema = z.object({
  title: z.string().nonempty({
    message: 'Чтобы создать категорию, вы должны ввести название'
  }),
  emoji: z.string().optional()
});

export type CategoryBody = z.infer<typeof categorySchema>;
