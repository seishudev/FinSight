import { Minus, Plus } from 'lucide-react';

import type { Tab } from '../interfaces/Tab';

export const transactionTabs: Tab[] = [
  {
    prefix: <Minus size={20} />,
    label: 'Расход',
    value: 'expense'
  },
  {
    prefix: <Plus size={20} />,
    label: 'Доход',
    value: 'income'
  }
];
