import type { Category } from '@/shared/stores/categories';

export interface OcrReceiptResponse {
  amount: number;
  date: string;
  comment: string;
  suggestedCategory: Category;
  allExpenseCategories: Category[];
}
