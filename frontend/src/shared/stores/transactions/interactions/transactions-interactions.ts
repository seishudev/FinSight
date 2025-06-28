import { makeAutoObservable } from 'mobx';

import type { TransactionType } from '@/shared/interfaces/TransactionType';
import type { OcrReceiptResponse } from '@/shared/model/Ocr';
import type { Transaction } from '@/shared/model/Transaction';
import { transactionsApiStore } from '../api/transactions-api';
import { analyticsApiStore } from '../../analytics';

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
  setTransactionType = (v: TransactionType) => this.transactionType = v;
  setIsTransactionDatePickerOpen = (v: boolean) => this.isTransactionDatePickerOpen = v;
  setIsAddTransactionModalOpen =  (v: boolean) => (this.isAddTransactionModalOpen = v);
  setAddTransactionInitialData = (data: OcrReceiptResponse | null) => this.addTransactionInitialData = data;

  openAddTransactionModal = (initialData: OcrReceiptResponse | null = null) => {
    this.setAddTransactionInitialData(initialData);
    this.setIsAddTransactionModalOpen(true);
    if (initialData) this.setTransactionType('expense');
  };

  closeAddTransactionModal = () => {
    this.setAddTransactionInitialData(null);
    this.setIsAddTransactionModalOpen(false);
  };

  unshiftTransaction = (transaction: Transaction) => {
    const { transactions } = transactionsApiStore;

    if (transactions?.state === 'fulfilled')
      // @ts-ignore
      transactions.value = [transaction, ...transactions.value];
  }

  popTransaction = () => {
    const { transactions } = transactionsApiStore;

    if (transactions?.state === 'fulfilled') {
      const length = transactions.value.length;
      // @ts-ignore
      transactions.value = transactions.value.slice(0, length - 1);
    }
  }

  increaseIncomes = (num: number) => {
    const { summaryAnalytics } = analyticsApiStore;

    if (summaryAnalytics?.state === 'fulfilled') {
      const [balance, incomes] = summaryAnalytics.value;

      balance.amount += num;
      incomes.amount += num;
    }
  }

  increaseExpenses = (num: number) => {
    const { summaryAnalytics } = analyticsApiStore;

    if (summaryAnalytics?.state === 'fulfilled') {
      const [balance, , expenses] = summaryAnalytics.value;

      balance.amount -= num;
      expenses.amount += num;
    }
  }

  // PAGINATION
  transactionsPage = 0;
  transactionsSize = 15;
  transactionsTotalPages: number | null = null;

  // PAGINATION MOVES
  setTransactionsPage = (page: number) => this.transactionsPage = page;
  setTransactionsSize = (size: number) => this.transactionsSize = size;
  setTransactionsTotalPages = (total: number) => this.transactionsTotalPages = total;
}

export const transactionsInteractionsStore = new TransactionsInteractionsStore();
