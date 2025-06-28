import { api } from '@/shared/api';
import type { GetTransactionsResponse } from './types';
import { transactionsInteractionsStore } from '../interactions/transactions-interactions'

export const getTransactions = async (page: number, size: number) => {
  const res = await api.get<GetTransactionsResponse>('/transactions', {
    params: { page, size }
  });

  transactionsInteractionsStore.setTransactionsTotalPages(res.data.totalPages);

  return res.data.content;
};
