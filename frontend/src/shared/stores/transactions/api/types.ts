import type { Transaction } from '@/shared/model/Transaction';

export interface GetTransactionsResponse {
   content: Transaction[];
   totalPages: number;
   
}