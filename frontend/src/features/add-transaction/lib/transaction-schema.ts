import { z } from 'zod';

export const transactionSchema = z.object({
  quantity: z
    .number({ message: 'Введите сумму транзакции' })
    .min(1, {
      message: 'Чтобы создать транзакцию, вы должны ввести сумму дохода/расхода'
    })
    .max(100000000, {
      message: 'За одну транзакцию можно перевести не более 100.000.000 рублей!'
    }),
  categoryId: z.number({ required_error: 'Выберите категорию' }),
  date: z.string().datetime({
    message: 'Чтобы создать транзакцию, вы должны ввести корректную дату'
  }),
  comment: z
    .string()
    .min(5, {
      message: 'Количество символов в комментариев должно быть больше 5'
    })
    .optional()
    .or(z.literal(''))
});

export type TransactionBody = z.infer<typeof transactionSchema>;
