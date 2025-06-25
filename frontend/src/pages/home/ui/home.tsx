import { observer } from 'mobx-react-lite';
import { nanoid } from 'nanoid';
import { ChevronRight } from 'lucide-react';

import { transactionsApiStore } from '@/shared/stores/transactions';
import { userMetric } from '@/shared/constants/user-metric';
import { ExpenseWrapper } from '@/widgets/expense-wrapper';
import { AddTransactionModal } from '@/features/add-transaction';
import { Metric } from '@/entities/metric';
import { QuickAnalytics } from '@entities/quick-analytics';
import { UserTargets } from '@entities/user-targets';
import { Transaction } from '@/entities/transaction';
import s from './home.module.scss';

export const Home = observer(() => {
  const { transactions } = transactionsApiStore;

  return (
    <div className={s.container}>
      <div className={s.header}>
        <section>
          <h2>Добро пожаловать!</h2>
          <p>Управляйте своими финансами легко и красиво</p>
        </section>

        <AddTransactionModal />
      </div>

      <div className={s.metric}>
        {userMetric.map(metric => (
          <Metric key={nanoid(4)} className={s.item} {...metric} />
        ))}
      </div>

      <div className={s.actions}>
        <QuickAnalytics />
        <UserTargets />
      </div>

      <ExpenseWrapper
        className={s.transactions}
        title='Последнии транзакции'
        link='Посмотреть историю транзакций'
        href='/transactions'
        linkIcon={<ChevronRight size={17} />}
      >
        {transactions?.state === 'fulfilled' &&
          transactions.value.map(transaction => (
            <Transaction {...transaction} />
          ))}
      </ExpenseWrapper>
    </div>
  );
});
