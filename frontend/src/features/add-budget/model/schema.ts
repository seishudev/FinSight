import { budgetInteractionsStore } from '@shared/stores/budgets/interactions/budgets-interactions';
import { z } from 'zod';

export const budgetSchema = z
  .object({
    budgetId: z.string().optional(),
    budget: z.coerce
      .number({ invalid_type_error: 'Лимит должен быть числом' })
      .positive('Лимит должен быть положительным числом')
      .optional(),
    periodId: z.enum(['weekly', 'monthly', 'yearly']).optional(),
    name: z
      .string()
      .max(20, {
        message: 'Максимальная длина названия не должна превышать 20 символов'
      })
      .optional(),
    amount: z.coerce
      .number({ invalid_type_error: 'Сумма должна быть числом' })
      .positive('Сумма должна быть положительной')
      .optional(),
    date: z.string().optional()
  })
  .superRefine((data, ctx) => {
    const { budgetType } = budgetInteractionsStore;

    if (budgetType === 'budget') {
      if (!data.budgetId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Необходимо выбрать категорию',
          path: ['budgetId']
        });
      }
      if (data.budget === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Необходимо указать лимит',
          path: ['budget']
        });
      }
      if (!data.periodId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Необходимо выбрать период',
          path: ['periodId']
        });
      }
    }

    if (budgetType === 'target') {
      if (!data.name || data.name.trim().length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Название должно содержать не менее 3 символов',
          path: ['name']
        });
      }
      if (data.amount === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Необходимо указать сумму',
          path: ['amount']
        });
      }
      if (!data.date) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Необходимо указать дату',
          path: ['date']
        });
      }
    }
  });

export type BudgetBody = z.infer<typeof budgetSchema>;
