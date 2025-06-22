import type { TransactionType } from '../stores/transactions'

export interface Transaction {
   id: string;
   type: TransactionType;
   amount: number;
   category: string;
   date: string;
   comment: string;
}