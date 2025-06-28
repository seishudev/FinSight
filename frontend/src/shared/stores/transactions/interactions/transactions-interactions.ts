import { makeAutoObservable } from 'mobx';

import type { OcrReceiptResponse } from '@/shared/model/Ocr';
import type { TransactionType } from './types';

class TransactionsInteractionsStore {
  constructor() {
    makeAutoObservable(this);
  }

  // STATES
  transactionType: TransactionType = 'expense';
  isTransactionDatePickerOpen = false;

  isAddTransactionModalOpen = false;
  addTransactionInitialData: OcrReceiptResponse | null = null;

  // MOVES
  setTransactionType = (v: TransactionType) => (this.transactionType = v);
  setIsTransactionDatePickerOpen = (v: boolean) =>
    (this.isTransactionDatePickerOpen = v);

  openAddTransactionModal = (initialData: OcrReceiptResponse | null = null) => {
    this.addTransactionInitialData = initialData;
    if (initialData) {
      this.transactionType = 'expense';
    }
    this.isAddTransactionModalOpen = true;
  };

  closeAddTransactionModal = () => {
    this.isAddTransactionModalOpen = false;
    this.addTransactionInitialData = null;
  };

  // PAGINATION
  transactionsPage = 1;
  transactionsSize = 15;

  // PAGINATION MOVES
  setTransactionsPage = (page: number) => (this.transactionsPage = page);
  setTransactionsSize = (size: number) => (this.transactionsSize = size);
}

export const transactionsInteractionsStore =
  new TransactionsInteractionsStore();
