import { makeAutoObservable } from 'mobx';
import { fromPromise, type IPromiseBasedObservable } from 'mobx-utils';

import type { TransactionBody } from '@/features/add-transaction';
import type { Transaction } from '@/shared/model/Transaction';
import { createTransaction } from '@/pages/analytics';
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
    try {
      const transaction = await createTransaction(body);
      if (this.transactions?.state == 'fulfilled')
        this.transactions.value.unshift(transaction);
    } catch (e) { console.log(e) }
  };
}

export const transactionsApiStore = new TransactionsApiStore();
