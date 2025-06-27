import { BudgetCard } from '@/entities/budget-card';
import { TargetCard } from '@/entities/target-card';
import { AddBudget } from '@/features/add-budget';
import { PageTitle } from '@entities/page-title';
import { Target } from 'lucide-react';
import s from './Budget.module.scss';

export const Budget = () => {
  return (
    <div>
      <section className={s.introduction}>
        <PageTitle
          icon={
            <div className={s.logo}>
              <Target className='text-white' size={20} />
            </div>
          }
          title='Бюджеты и цели'
          description='Контролируйте свои расходы по категориям'
        />

        <AddBudget />
      </section>

      <section className='grid grid-cols-1 lg:grid-cols-2 gap-4 mdx:gap-6 mt-6'>
        <BudgetCard
          icon='🍽️'
          title='Еда'
          period='weekly'
          spentAmount={15000}
          limit={40000}
          percentageUsed={40}
          remainingAmount={25000}
        />
        <TargetCard
          icon='🛸'
          title='Новый iPhone'
          date={new Date('2025-06-28')}
          currentAmount={20000}
          targetAmount={10000}
          percentageUsed={20}
        />
      </section>
    </div>
  );
};
