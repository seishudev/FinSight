import { api } from '@/shared/api';
import type { GetTransactionsResponse } from './types';

export const getTransactions = async (page: number, size: number) => {
  const res = await api.get<GetTransactionsResponse>('/transactions', {
    params: { page, size }
  });

  return res.data.content;
};
