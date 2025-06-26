import { SplinePointer, Wallet } from 'lucide-react';
import type { Tab } from '../interfaces/Tab';

export const budgetTabs: Tab[] = [
  {
    prefix: <SplinePointer size={20} />,
    label: 'Цель',
    value: 'target'
  },
  {
    prefix: <Wallet size={20} />,
    label: 'Бюджет',
    value: 'budget'
  }
];
