import { makeAutoObservable } from 'mobx';
import type { IPromiseBasedObservable } from 'mobx-utils';

import type { TransactionBody } from '@/features/add-transaction';
import type { Transaction } from '@/shared/model/Transaction';
import { createTransaction } from '@/pages/analytics';

class TransactionsApiStore {
  constructor() { makeAutoObservable(this) }

  // STATES
  transactions: IPromiseBasedObservable<Transaction[]> | null = null;

  // ACTIONS
  createTransactionAction = async (body: TransactionBody) => {
    try {
      const transaction = await createTransaction(body);
      if (this.transactions?.state == 'fulfilled')
        this.transactions.value.push(transaction);
    } catch (e) { console.log(e) }
  }
}

export const transactionsApiStore = new TransactionsApiStore();
