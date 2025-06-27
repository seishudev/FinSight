import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { nanoid } from 'nanoid';
import { ChevronRight, Goal, Receipt, Target } from 'lucide-react';

import { analyticsApiStore } from '@/shared/stores/analytics';
import { budgetsApiStore } from '@/shared/stores/budgets';
import {
  transactionsApiStore,
  transactionsInteractionsStore
} from '@/shared/stores/transactions';
import { Empty } from '@/shared/ui/custom';
import type { UserSummaryMetric } from '@/shared/model/UserSummaryAnalytics';
import { ExpenseWrapper } from '@/widgets/expense-wrapper';
import { AddTransactionModal } from '@/features/add-transaction';
import { QuickAnalytics } from '@entities/quick-analytics';
import { UserTargets } from '@entities/user-targets';
import { Transaction } from '@/entities/transaction';
import { Metric } from '@/entities/metric';
import s from './home.module.scss';

export const Home = observer(() => {
  const { transactions, getTransactions } = transactionsApiStore;
  const { setTransactionsSize } = transactionsInteractionsStore;
  const { getUserSummaryAnalyticsAction, summaryAnalytics } = analyticsApiStore;
  const { getMostUsedBudgetAction, mostUsedBudget } = budgetsApiStore;

  // useEffect(() => {
  //   getUserSummaryAnalyticsAction();
  //   getMostUsedBudgetAction();
  //   setTransactionsSize(3);
  //   getTransactions();
  // }, []);

  return (
    <div className={s.container}>
      <div className={s.header}>
        <section>
          <h2>Добро пожаловать!</h2>
          <p>Управляйте своими финансами легко и красиво</p>
        </section>

        <AddTransactionModal />
      </div>

      {summaryAnalytics?.state === 'fulfilled' && (
        <div className={s.metric}>
          {summaryAnalytics.value
            .filter(analytics => analytics.type !== 'transactions')
            .map(analytics => (
              <Metric key={nanoid(4)} {...(analytics as UserSummaryMetric)} />
            ))}
        </div>
      )}

      <div className={s.actions}>
        <QuickAnalytics />
        {mostUsedBudget?.state === 'fulfilled' && <UserTargets {...mostUsedBudget.value} />}

        {mostUsedBudget?.state === 'rejected' && (
          <ExpenseWrapper
            className={s.emptyUserTargets}
            title='Бюджеты и цели'
            icon={<Target />}
          >
            <Empty
              icon={<Goal />}
              title='Нет бюджетов или целей'
              description='Чтобы посмотреть ваш прогресс, вы должны создать ваш первый бюджет'
              link='/budgets'
              linkLabel='Создать'
            />
          </ExpenseWrapper>
        )}
      </div>

      <ExpenseWrapper
        className={s.transactions}
        title='Последнии транзакции'
        link='Посмотреть историю транзакций'
        href={
          (transactions?.value as Array<void>)?.length > 0
            ? '/transactions'
            : undefined
        }
        linkIcon={<ChevronRight size={17} />}
      >
        {transactions?.state === 'fulfilled' &&
        transactions.value.length > 0 ? (
          transactions.value.map(transaction => (
            <Transaction {...transaction} />
          ))
        ) : (
          <Empty
            icon={<Receipt />}
            title='Нет транзакций'
            description='Чтобы посмотреть последние транзакции, создайте свою первую транзакцию!'
          />
        )}
      </ExpenseWrapper>
    </div>
  );
});
