import { z } from 'zod';

export const budgetSchema = z.object({});

export type BudgetBody = z.infer<typeof budgetSchema>;
