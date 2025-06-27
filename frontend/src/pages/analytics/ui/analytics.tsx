import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import {
  ChartColumnStacked,
  PieChart,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import { observer } from 'mobx-react-lite';

import { analyticsApiStore } from '@/shared/stores/analytics';
import { ColumnChart } from '@/shared/ui/custom/ColumnChart';
import { getGradient } from '@/shared/utils/get-gradient';
import { Empty } from '@/shared/ui/custom';
import { ExpenseWrapper } from '@/widgets/expense-wrapper';
import { AnalyticsCategoriesModal } from '@/entities/analytics-categories-modal';
import { UserAnalytics } from '@/entities/user-analytics';
import { PageTitle } from '@/entities/page-title';
import { AnalyticsPieChart } from '@/entities/analytics-pie-chart';
import { AnalyticsCategory } from '@/entities/analytics-category';
import s from './analytics.module.scss';

export const Analytics = observer(() => {
  const {
    summaryAnalytics,
    categoriesAnalytics,
    spendingTrendAnalytics,
    getCategoriesAnalyticsAction,
    getWeeklySpendingTrendAction,
    getUserSummaryAnalyticsAction
  } = analyticsApiStore;

  useEffect(() => {
    getUserSummaryAnalyticsAction();
    getCategoriesAnalyticsAction();
    getWeeklySpendingTrendAction();
  }, []);

  const incomeCategories =
    categoriesAnalytics?.state === 'fulfilled'
      ? categoriesAnalytics.value.incomeCategories
      : null;

  const expenseCategories =
    categoriesAnalytics?.state === 'fulfilled'
      ? categoriesAnalytics.value.expenseCategories
      : null;

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
        {summaryAnalytics?.state === 'fulfilled' &&
          summaryAnalytics.value.map(analytics => (
            <UserAnalytics key={nanoid(4)} {...analytics} />
          ))}
      </div>

      <div className={s.structures}>
        <AnalyticsPieChart
          pieceTitle='Доход'
          title='Структура доходов'
          emptyText='Нет данных о доходах'
          emptyDesc='Чтобы получить аналитику доходов, вам нужно произвести как минимум 1 транзакцию'
          values={
            incomeCategories?.map(c => ({
              name: c.categoryName,
              y: c.totalAmount
            })) ?? []
          }
          icon={<TrendingUp size={20} color='#4ade80' />}
        />

        <ExpenseWrapper className={s.wrapper} title='Категории доходов'>
          {!incomeCategories || incomeCategories.length <= 0 ? (
            <Empty
              className={s.emptyCategories}
              title='Нет данных о категориях доходов'
              description='Чтобы получить данные о категориях, вам нужно провести как минимум 1 транзакцию'
              icon={<ChartColumnStacked />}
            />
          ) : (
            <>
              {incomeCategories
                .slice(0, 3)
                .map(({ categoryId, ...category }, i) => (
                  <AnalyticsCategory
                    {...category}
                    key={categoryId}
                    gradient={getGradient(i)}
                  />
                ))}

              <AnalyticsCategoriesModal
                categories={incomeCategories}
                title='Категории доходов'
              />
            </>
          )}
        </ExpenseWrapper>
      </div>

      <div className={s.structures}>
        <AnalyticsPieChart
          pieceTitle='Расход'
          title='Структура расходов'
          emptyText='Нет данных о расходах'
          emptyDesc='Чтобы получить аналитику расходов, вам нужно произвести как минимум 1 транзакцию'
          values={
            expenseCategories?.map(c => ({
              name: c.categoryName,
              y: c.totalAmount
            })) ?? []
          }
          icon={<TrendingDown size={20} color='#f87171' />}
        />

        <ExpenseWrapper className={s.wrapper} title='Категории расходов'>
          {!expenseCategories || expenseCategories.length <= 0 ? (
            <Empty
              className={s.emptyCategories}
              title='Нет данных о категориях расходов'
              description='Чтобы получить данные о категориях, вам нужно провести как минимум 1 транзакцию'
              icon={<ChartColumnStacked />}
            />
          ) : (
            <>
              {expenseCategories
                .slice(0, 3)
                .map(({ categoryId, ...categorie }, i) => (
                  <AnalyticsCategory
                    {...categorie}
                    key={categoryId}
                    gradient={getGradient(i)}
                  />
                ))}

              <AnalyticsCategoriesModal
                categories={expenseCategories}
                title='Категории расходов'
              />
            </>
          )}
        </ExpenseWrapper>
      </div>

      {spendingTrendAnalytics?.state === 'fulfilled' && (
        <ExpenseWrapper className={s.trend} title='Тренд расходов и доходов за 7 дней'>
          <ColumnChart
            dates={spendingTrendAnalytics.value.map(obj => obj.date)}
            values={[
              {
                name: 'Расходы',
                type: 'column',
                data: spendingTrendAnalytics.value.map(obj => obj.expense)
              },
              {
                name: 'Доходы',
                type: 'column',
                data: spendingTrendAnalytics.value.map(obj => obj.income)
              }
            ]}
          />
        </ExpenseWrapper>
      )}
    </div>
  );
});
