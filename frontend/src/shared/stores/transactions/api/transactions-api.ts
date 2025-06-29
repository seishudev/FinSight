import { makeAutoObservable } from 'mobx';
import { fromPromise, type IPromiseBasedObservable } from 'mobx-utils';
import { toast } from 'sonner';

import type { TransactionBody } from '@/features/add-transaction';
import { createTransaction } from '@/pages/analytics';
import type { Transaction } from '@/shared/model/Transaction';
import { transactionsInteractionsStore } from '../interactions/transactions-interactions';
import { getTransactions } from './get-transactions.api';

class TransactionsApiStore {
  constructor() {
    makeAutoObservable(this);
  }

  // STATES
  transactions: IPromiseBasedObservable<Transaction[]> | null = null;

  // ACTIONS
  getTransactions = () => {
    const { transactionsPage, transactionsSize } = transactionsInteractionsStore;

    try { this.transactions = fromPromise(getTransactions(transactionsPage, transactionsSize)) }
    catch (e) { console.log(e) }
  };

  createTransactionAction = async (body: TransactionBody) => {
    const {
      unshiftTransaction,
      popTransaction,
      increaseExpenses,
      increaseIncomes
    } = transactionsInteractionsStore;

    try {
      const { transactionType } = transactionsInteractionsStore;
      const payload = { ...body, type: transactionType };

      const transaction = await createTransaction(payload);

      if (transactionType === 'income') increaseIncomes(transaction.amount);
      else increaseExpenses(transaction.amount);

      if (
        this.transactions?.state === 'fulfilled' &&
        this.transactions.value.length >= 3
      ) popTransaction();

      unshiftTransaction(transaction);

      toast.success('Транзакция добавлена!');
    } catch (e) {
      console.log(e);
      toast.error('Упс.. Произошла ошибка при добавлении транзакции');
    }
  };
}

export const transactionsApiStore = new TransactionsApiStore();
