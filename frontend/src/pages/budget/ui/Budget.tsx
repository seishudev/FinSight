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
          title='Бюджеты и лимиты'
          description='Контролируйте свои расходы по категориям'
        />

        <AddBudget />
      </section>
    </div>
  );
};
