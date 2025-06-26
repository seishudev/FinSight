import { TrendingDown, TrendingUp, Wallet } from 'lucide-react';

export const metricPresets = {
  income: {
    gradient: 'bg-gradient-to-r from-blue-500 to-cyan-600',
    emoji: '📈',
    title: 'Доходы',
    color: '#60a5fa',
    icon: <TrendingUp color='#fff' />
  },
  expense: {
    gradient: 'bg-gradient-to-r from-red-500 to-pink-600',
    emoji: '📉',
    title: 'Расходы',
    color: '#f87171',
    icon: <TrendingDown color='#fff' />
  },
  balance: {
    gradient: 'bg-gradient-to-r from-green-500 to-emerald-600',
    color: '#4ade80',
    emoji: '💰',
    title: 'Баланс',
    icon: <Wallet color='#fff' />
  }
};
