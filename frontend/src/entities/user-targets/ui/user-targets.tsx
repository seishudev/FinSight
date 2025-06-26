import { Target } from 'lucide-react';

import type { Budget } from '@/shared/model/Budget';
import { Progress } from '@/shared/ui/progress';
import { ExpenseWrapper } from '@/widgets/expense-wrapper';
import s from './user-targets.module.scss';

export const UserTargets = (props: Budget) => {
  return (
    <ExpenseWrapper
      title='Бюджеты и цели'
      icon={<Target />}
    >
      <div className={s.budget}>
        <section className={s.name}>
          <h3>{props.category.name}</h3>
          <p>
            {props.spentAmount} / {props.limitAmount} ₽
          </p>
        </section>

        <Progress value={props.percentageUsed} className={s.progress} />
      </div>
    </ExpenseWrapper>
  );
};
