import { makeAutoObservable } from 'mobx';

import type { TransactionType } from './types';

class TransactionsInteractionsStore {
  constructor() { makeAutoObservable(this) }

  // STATES
  transactionType: TransactionType = "expense";
  isTransactionDatePickerOpen = false;

  // MOVES
  setTransactionType = (v: TransactionType) => this.transactionType = v;
  setIsTransactionDatePickerOpen = (v: boolean) => this.isTransactionDatePickerOpen = v;
}

export const transactionsInteractionsStore = new TransactionsInteractionsStore()