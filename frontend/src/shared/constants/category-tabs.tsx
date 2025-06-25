import { Minus, Plus } from 'lucide-react';
import type { Tab } from '../interfaces/Tab';

export const categoryTabs: Tab[] = [
  {
    prefix: <Minus size={20} />,
    label: 'Расходы',
    value: 'expense'
  },
  {
    prefix: <Plus size={20} />,
    label: 'Доходы',
    value: 'income'
  }
];
