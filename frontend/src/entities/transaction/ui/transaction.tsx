import { TrendingDown, TrendingUp } from 'lucide-react';

import type { Transaction as TransactionModel } from '@/shared/model/Transaction';
import { cn } from '@/shared/utils/tw-merge';
import s from './transaction.module.scss';

export const Transaction = (props: TransactionModel) => {
  const isIncome = props.type === 'income';

  return (
    <div className={s.container}>
      <div className={s.characteristic}>
        <div className={cn(s.icon, isIncome ? s.income : s.expense)}>
          {isIncome ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
        </div>

        <section>
          <h3 className={s.transactionCategory}>{props.category}</h3>
          <p className={s.transactionDate}>{props.date}</p>
        </section>
      </div>
      <div>
        <p className={cn(s.amount, isIncome ? "text-green-400" : "text-red-400")}>
          {isIncome ? '+' : '-'}
          {props.amount}{' '}
          ₽
        </p>
        <p className={s.comment}>{props.comment}</p>
      </div>
    </div>
  );
};
