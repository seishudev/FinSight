import { Target } from 'lucide-react';

import { Progress } from '@/shared/ui/progress';
import { ExpenseWrapper } from '@/widgets/expense-wrapper';
import s from './user-targets.module.scss';

export const UserTargets = () => {
  return (
    <ExpenseWrapper
      title='Бюджеты и цели'
      className={s.wrapper}
      icon={<Target />}
    >
      <div className={s.budget}>
        <section className={s.name}>
          <h3>Рестораны</h3>
          <p>3,200 / 5,000 ₽</p>
        </section>

        <Progress
          value={Math.floor((3200 / 5000) * 100)}
          className={s.progress}
        />
      </div>
    </ExpenseWrapper>
  );
};
