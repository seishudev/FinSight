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
  getTransactions = async (type?: string) => {
    const {
      transactionsPage,
      transactionsSize,
      setTransactionsPage,
      setTransactionsSize
    } = transactionsInteractionsStore;

    try {
      if (type === 'pagination') {
        setTransactionsPage(transactionsPage + 1);
        setTransactionsSize(transactionsSize + 15);
      }

      const promise = getTransactions(transactionsPage, transactionsSize);

      if (type === 'pagination') {
        this.transactions = fromPromise(
          Promise.resolve([
            ...(this.transactions!.value as Transaction[]),
            ...(await promise)
          ])
        );
      } else this.transactions = fromPromise(promise);
    } catch (e) { console.log(e) }
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

      popTransaction();
      unshiftTransaction(transaction);

      toast.success('Транзакция добавлена!');
    } catch (e) {
      console.log(e);
      toast.error('Упс.. Произошла ошибка при добавлении транзакции');
    }
  };
}

export const transactionsApiStore = new TransactionsApiStore();
