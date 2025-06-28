import { Target } from 'lucide-react';

import type { UserFinancialTarget } from '@/shared/model/UserFinancialTarget';
import { Progress } from '@/shared/ui/progress';
import { useMobile } from '@/shared/hooks/useMobile';
import { cn } from '@/shared/utils/tw-merge';
import { ExpenseWrapper } from '@/widgets/expense-wrapper';
import s from './user-targets.module.scss';

export const UserTargets = ({ type, budget, goal }: UserFinancialTarget) => {
  const isMobile = useMobile(768);

  const currentSum = type === 'goal' ? goal.currentAmount : budget.spentAmount;
  const targetSum = type === 'goal' ? goal.targetAmount : budget.limitAmount;
  const category = type === 'goal' ? null : budget.category;
  const percentageUsed = type === 'goal' ? goal.percentage : budget.percentageUsed;

  return (
    <ExpenseWrapper
      title='Бюджеты и цели'
      className={s.wrapper}
      icon={<Target />}
    >
      <div className={s.budget}>
        <div className={s.name}>
          <section className={s.head}>
            {category ? (
              <h3>
                {category.icon} {category.name}
              </h3>
            ) : (
              <h3>
                <Target />
                {goal.name}
              </h3>
            )}

            <div className={cn(s.badge, type === 'goal' ? 'bg-purple-400/65' : 'bg-green-400/65')}>
              <p>{type === 'goal' ? 'Цель' : 'Бюджет'}</p>
            </div>
          </section>

          <p className={s.value}>
            {!isMobile ? (
              <>
                {currentSum} / {targetSum} ₽
              </>
            ) : (
              <>{percentageUsed}%</>
            )}
          </p>
        </div>

        <Progress value={percentageUsed} className={s.progress} />
      </div>
    </ExpenseWrapper>
  );
};
