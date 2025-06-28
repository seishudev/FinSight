import type { TransactionType } from '../interfaces/TransactionType';
import type { Category } from '../stores/categories'

export interface Transaction {
   id: number;
   type: TransactionType;
   amount: number;
   category: Category;
   date: string;
   comment?: string;
}