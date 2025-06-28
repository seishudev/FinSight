import type { TransactionBody } from '@/features/add-transaction';
import { api } from '@/shared/api';
import type { Transaction } from '@/shared/model/Transaction';
import type { TransactionType } from '@/shared/stores/transactions';

export interface CreateTransactionPayload extends TransactionBody {
  type: TransactionType;
}

export const createTransaction = async (body: CreateTransactionPayload) => {
  const res = await api.post<Transaction>('/transactions', body);

  return res.data;
};
