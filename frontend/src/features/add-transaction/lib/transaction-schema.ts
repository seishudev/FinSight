import { z } from 'zod';

export const transactionSchema = z.object({
  date: z.string(),
  amount: z
    .number({ message: 'Введите сумму транзакции' })
    .min(10, {
      message:
        'Чтобы создать транзакцию, вы должны ввести сумму дохода/расхода не менее 10 рублей'
    })
    .max(100000000, {
      message: 'За одну транзакцию можно перевести не более 100.000.000 рублей!'
    }),
  comment: z.preprocess(
    val => (val === '' ? undefined : val),
    z
      .string()
      .min(5, {
        message: 'Количество символов в комментариев должно быть больше 5'
      })
      .optional()
  ),
  categoryId: z.number({
    message: 'Чтобы создать транзакцию, вы должны выбрать категорию'
  }),
});

export type TransactionBody = z.infer<typeof transactionSchema>;
