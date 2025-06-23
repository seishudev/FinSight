import { observer } from 'mobx-react-lite';
import { nanoid } from 'nanoid';

import { AddTransactionModal } from '@/features/add-transaction';
import { userMetric } from '@/shared/constants/user-metric';
import { Metric } from '@/entities/metric';
import { QuickAnalytics } from '@entities/quick-analytics';
import { UserTargets } from '@entities/user-targets';
import s from './home.module.scss';
import { ExpenseWrapper } from '@/widgets/expense-wrapper';
import { mockLatestTransactions } from '@/shared/constants/mock-transactions';
import { Transaction } from '@/entities/transaction';
import { ChevronRight } from 'lucide-react'

export const Home = observer(() => {
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
        {mockLatestTransactions.map(transaction => (
          <Transaction {...transaction} />
        ))}
      </ExpenseWrapper>
    </div>
  );
});
