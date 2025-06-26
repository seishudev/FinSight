import { CategoryDialog } from '@features/add-category';
import { categoriesApiStore } from '@shared/stores/categories';
import type { Category } from '@shared/stores/categories/interactions/types';
import { CategoriesList } from '@widgets/categories-list';
import { Tag } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import s from './Categories.module.scss';
import { PageTitle } from '@/entities/page-title';

export const Categories = observer(() => {
  const { categoriesExpense, categoriesIncome, getCategoriesByTypeAction } =
    categoriesApiStore;

  useEffect(() => {
    getCategoriesByTypeAction('expense');
    getCategoriesByTypeAction('income');
  }, [getCategoriesByTypeAction]);

  const expenseData: Category[] | null =
    categoriesExpense?.state === 'fulfilled' ? categoriesExpense.value : null;

  const incomeData: Category[] | null =
    categoriesIncome?.state === 'fulfilled' ? categoriesIncome.value : null;

  return (
    <div className={s.container}>
      <section className={s.introduction}>
        <PageTitle
          title='Категории'
          description='Управление категориями доходов и расходов'
          icon={
            <div className={s.logo}>
              <Tag size={20} />
            </div>
          }
        />

        <CategoryDialog />
      </section>

      <CategoriesList
        title='Категории расходов'
        icon='📉'
        categories={expenseData}
      />
      <CategoriesList
        title='Категории доходов'
        icon='📈'
        categories={incomeData}
      />
    </div>
  );
});
