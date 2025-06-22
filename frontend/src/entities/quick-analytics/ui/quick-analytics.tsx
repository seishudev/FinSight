import { Link } from 'react-router';
import { ChartColumn } from 'lucide-react';

import { ExpenseWrapper } from '@/widgets/expense-wrapper';
import s from './quick-analytics.module.scss';

export const QuickAnalytics = () => {
  return (
    <ExpenseWrapper
      title='Быстрая аналитика'
      className={s.wrapper}
      icon={<ChartColumn />}
    >
      <Link to='/analytics' className={s.analyticsDetails}>
        Посмотреть подробную аналитику
      </Link>
    </ExpenseWrapper>
  );
};
