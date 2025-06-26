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

  // PAGINATION
  transactionsPage = 1;
  transactionsSize = 15;

  // PAGINATION MOVES
  setTransactionsPage = (page: number) => this.transactionsPage = page;
  setTransactionsSize = (size: number) => this.transactionsSize = size;
}

export const transactionsInteractionsStore = new TransactionsInteractionsStore()