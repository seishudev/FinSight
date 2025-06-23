import { makeAutoObservable } from 'mobx';

class TransactionsApiStore {
  constructor() { makeAutoObservable(this) }
}

export const transactionsApiStore = new TransactionsApiStore();
