import type { TransactionBody } from '@/features/add-transaction';
import type { Transaction } from '@/shared/model/Transaction';
import { api } from '@/shared/api'

export const createTransaction = async (body: TransactionBody) => {
   const res = await api.post<Transaction>("/transactions", body);

   return res.data
}