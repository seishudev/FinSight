import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { PieChart, TrendingDown, TrendingUp } from 'lucide-react';
import { observer } from 'mobx-react-lite';

import { analyticsApiStore } from '@/shared/stores/analytics';
import { UserAnalytics } from '@/entities/user-analytics';
import { PageTitle } from '@/entities/page-title';
import { AnalyticsPieChart } from '@/entities/analytics-pie-chart';
import { ExpenseWrapper } from '@/widgets/expense-wrapper';
import { ColumnChart } from '@/shared/ui/custom/ColumnChart';
import s from './analytics.module.scss';

export const Analytics = observer(() => {
  const { getUserSummaryAnalyticsAction, summaryAnalytics } = analyticsApiStore;

  useEffect(() => { getUserSummaryAnalyticsAction() }, []);

  return (
    <div className={s.container}>
      <PageTitle
        title='Аналитика'
        description='Полный анализ доходов и расходов за месяц'
        icon={
          <div className={s.logo}>
            <PieChart size={20} color='#fff' />
          </div>
        }
      />

      <div className={s.analytics}>
        {summaryAnalytics?.state === 'fulfilled' && (
          summaryAnalytics.value.map(analytics => (
          <UserAnalytics key={nanoid(4)} {...analytics} />
        ))
        )}
      </div>

      <div className={s.structures}>
        <AnalyticsPieChart
          pieceTitle='Доход'
          title='Структура доходов'
          emptyText='Нет данных о доходах'
          values={[1534, 435, 3453, 34535]}
          icon={<TrendingUp size={20} color='#4ade80' />}
        />

        <ExpenseWrapper
          className={s.wrapper}
          title='Категории доходов'
        ></ExpenseWrapper>
      </div>

      <div className={s.structures}>
        <AnalyticsPieChart
          pieceTitle='Расход'
          title='Структура расходов'
          emptyText='Нет данных о расходах'
          values={[1000, 500]}
          icon={<TrendingDown size={20} color='#f87171' />}
        />

        <ExpenseWrapper
          className={s.wrapper}
          title='Категории расходов'
        ></ExpenseWrapper>
      </div>

      <ExpenseWrapper className={s.trend} title='Тренд расходов и доходов'>
        <ColumnChart
          values={[
            {
              name: 'Расходы',
              type: 'column',
              data: [1534, 435, 3453, 34535]
            },
            {
              name: 'Доходы',
              type: 'column',
              data: [1000, 500]
            }
          ]}
        />
      </ExpenseWrapper>
    </div>
  );
});
