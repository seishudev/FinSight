import { z } from "zod";

export const transactionSchema = z.object({
   quantity: z.string().nonempty({ message: "Чтобы создать транзакцию, вы должны ввести сумму дохода/расхода" }),
   category: z.string().nonempty({ message: "Чтобы создать транзакцию, вы должны выбрать категорию" }),
   date: z.string().datetime({ message: "Чтобы создать транзакцию, вы должны ввести корректную дату" }),
   comment: z.string().min(5, { message: "Количество символов в комментариев должно быть больше 5" }).nullable()
});

export type TransactionBody = z.infer<typeof transactionSchema>; 