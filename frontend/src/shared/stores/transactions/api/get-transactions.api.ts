import type { Transaction } from '@/shared/model/Transaction';
import { api } from '@/shared/api';

export const getTransactions = async (page: number, size: number) => {
   const res = await api.get<Transaction[]>("/transactions", { params: { page, size } });

   return res.data;
}