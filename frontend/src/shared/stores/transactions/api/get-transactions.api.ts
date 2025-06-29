import { api } from '@/shared/api';
import { transactionsInteractionsStore } from '../interactions/transactions-interactions';
import type { GetTransactionsResponse } from './types';

export const getTransactions = async (page: number, size: number) => {
  const res = await api.get<GetTransactionsResponse>('/transactions', {
    params: { page, size }
  });

  transactionsInteractionsStore.setTransactionsTotalPages(res.data.totalPages);

  return res.data.content;
};
