import { TrendingDown, TrendingUp, Wallet } from 'lucide-react';

export const userMetric = [
  {
    type: 'balance',
    emoji: '💰',
    title: 'Баланс',
    amount: 69722,
  },
  {
    type: 'income',
    emoji: '📈',
    title: 'Доходы',
    amount: 75000,
  },
  {
    type: 'expense',
    emoji: '📉',
    title: 'Расходы',
    amount: 5278,
  }
] as const;

export const metricPresets = {
  income: {
    gradient: 'bg-gradient-to-r from-blue-500 to-cyan-600',
    color: '#60a5fa',
    icon: <TrendingUp color='#fff' />
  },
  expense: {
    gradient: 'bg-gradient-to-r from-red-500 to-pink-600',
    color: '#f87171',
    icon: <TrendingDown color='#fff' />
  },
  balance: {
    gradient: 'bg-gradient-to-r from-green-500 to-emerald-600',
    color: '#4ade80',
    icon: <Wallet color='#fff' />
  }
};
