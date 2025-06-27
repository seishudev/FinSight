import { BudgetCard } from '@/entities/budget-card';
import { TargetCard } from '@/entities/target-card';
import { AddBudget } from '@/features/add-budget';
import { budgetsApiStore } from '@/shared/stores/budgets';
import { Empty } from '@/shared/ui/custom';
import { PageTitle } from '@entities/page-title';
import { Goal, LoaderCircle, Target, Wallet } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import s from './Budget.module.scss';

export const Budget = observer(() => {
  const { budgets, targets, getBudgetsAction, getTargetsAction } =
    budgetsApiStore;

  useEffect(() => {
    getBudgetsAction();
    getTargetsAction();
  }, [getBudgetsAction, getTargetsAction]);

  const renderLoader = () => (
    <div className='col-span-1 lg:col-span-2 flex justify-center items-center py-8'>
      <Empty
        icon={<LoaderCircle className='animate-spin' />}
        title='Загрузка...'
      />
    </div>
  );

  const renderBudgets = () => {
    if (!budgets || budgets.state === 'pending') {
      return renderLoader();
    }
    if (budgets.state === 'rejected') {
      return (
        <p className='text-red-500 text-center col-span-1 lg:col-span-2'>
          Ошибка загрузки бюджетов
        </p>
      );
    }
    if (budgets.value.length === 0) {
      return (
        <div className='col-span-1 lg:col-span-2 flex justify-center items-center'>
          <Empty
            icon={<Wallet />}
            title='Нет созданных бюджетов'
            description='Создайте свой первый бюджет, чтобы начать отслеживать расходы по категориям.'
          />
        </div>
      );
    }
    return budgets.value.map(budget => (
      <BudgetCard
        key={nanoid(4)}
        id={budget.id}
        icon={budget.category.icon}
        title={budget.category.name}
        period={budget.period}
        spentAmount={budget.spentAmount}
        limit={budget.limitAmount}
        percentageUsed={budget.percentageUsed}
        remainingAmount={budget.remainingAmount}
      />
    ));
  };

  const renderTargets = () => {
    if (!targets || targets.state === 'pending') {
      return renderLoader();
    }
    if (targets.state === 'rejected') {
      return (
        <p className='text-red-500 text-center col-span-1 lg:col-span-2'>
          Ошибка загрузки целей
        </p>
      );
    }
    if (targets.value.length === 0) {
      return (
        <div className='col-span-1 lg:col-span-2 flex justify-center items-center'>
          <Empty
            icon={<Goal />}
            title='Нет созданных целей'
            description='Поставьте финансовую цель, чтобы мотивировать себя на накопления.'
          />
        </div>
      );
    }
    return targets.value.map(target => (
      <TargetCard
        key={nanoid(4)}
        id={target.id}
        icon={target.icon}
        title={target.name}
        date={new Date(target.targetDate)}
        currentAmount={target.currentAmount}
        targetAmount={target.targetAmount}
        remainingAmount={target.remainingAmount}
        percentageUsed={target.percentage}
      />
    ));
  };

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

      <section className='mt-6'>
        <h2 className='text-xl lg:text-2xl font-bold text-white mb-4'>
          Бюджеты
        </h2>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mdx:gap-6'>
          {renderBudgets()}
        </div>
      </section>

      <section className='mt-8'>
        <h2 className='text-xl lg:text-2xl font-bold text-white mb-4'>Цели</h2>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mdx:gap-6'>
          {renderTargets()}
        </div>
      </section>
    </div>
  );
});
