import type { Transaction } from '../model/Transaction';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'expense',
    amount: 3200,
    category: 'Еда',
    date: '2025-01-15',
    comment: 'Ужин в ресторане'
  },
  {
    id: '2',
    type: 'expense',
    amount: 1500,
    category: 'Транспорт',
    date: '2025-01-14',
    comment: 'Такси'
  },
  {
    id: '3',
    type: 'income',
    amount: 75000,
    category: 'Зарплата',
    date: '2025-01-10',
    comment: 'Зарплата за январь'
  },
  {
    id: '1',
    type: 'expense',
    amount: 3200,
    category: 'Еда',
    date: '2025-01-15',
    comment: 'Ужин в ресторане'
  },
  {
    id: '2',
    type: 'expense',
    amount: 1500,
    category: 'Транспорт',
    date: '2025-01-14',
    comment: 'Такси'
  },
  {
    id: '3',
    type: 'income',
    amount: 75000,
    category: 'Зарплата',
    date: '2025-01-10',
    comment: 'Зарплата за январь'
  },
  {
    id: '1',
    type: 'expense',
    amount: 3200,
    category: 'Еда',
    date: '2025-01-15',
    comment: 'Ужин в ресторане'
  },
  {
    id: '2',
    type: 'expense',
    amount: 1500,
    category: 'Транспорт',
    date: '2025-01-14',
    comment: 'Такси'
  },
  {
    id: '3',
    type: 'income',
    amount: 75000,
    category: 'Зарплата',
    date: '2025-01-10',
    comment: 'Зарплата за январь'
  },
  {
    id: '1',
    type: 'expense',
    amount: 3200,
    category: 'Еда',
    date: '2025-01-15',
    comment: 'Ужин в ресторане'
  },
  {
    id: '2',
    type: 'expense',
    amount: 1500,
    category: 'Транспорт',
    date: '2025-01-14',
    comment: 'Такси'
  },
  {
    id: '3',
    type: 'income',
    amount: 75000,
    category: 'Зарплата',
    date: '2025-01-10',
    comment: 'Зарплата за январь'
  },
  {
    id: '1',
    type: 'expense',
    amount: 3200,
    category: 'Еда',
    date: '2025-01-15',
    comment: 'Ужин в ресторане'
  },
  {
    id: '2',
    type: 'expense',
    amount: 1500,
    category: 'Транспорт',
    date: '2025-01-14',
    comment: 'Такси'
  },
  {
    id: '3',
    type: 'income',
    amount: 75000,
    category: 'Зарплата',
    date: '2025-01-10',
    comment: 'Зарплата за январь'
  }
];

export const mockLatestTransactions = mockTransactions.slice(0, 3);
