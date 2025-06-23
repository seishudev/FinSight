import { makeAutoObservable } from 'mobx';

import type { TransactionType } from './types';

class TransactionsInteractionsStore {
  constructor() { makeAutoObservable(this) }

  // STATES
  transactionType: TransactionType = "expense";

  // MOVES
  setTransactionType = (v: TransactionType) => this.transactionType = v;
}

export const transactionsInteractionsStore = new TransactionsInteractionsStore()