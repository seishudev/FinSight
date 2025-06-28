import { PageTitle } from '@/entities/page-title';
import { Empty } from '@/shared/ui/custom';
import { CategoryDialog } from '@features/add-category';
import { categoriesApiStore } from '@shared/stores/categories';
import { CategoriesList } from '@widgets/categories-list';
import { LoaderCircle, Tag } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import s from './Categories.module.scss';

export const Categories = observer(() => {
  const {
    categoriesExpense,
    categoriesIncome,
    expenseState,
    incomeState,
    getCategoriesByTypeAction
  } = categoriesApiStore;

  useEffect(() => {
    getCategoriesByTypeAction('expense');
    getCategoriesByTypeAction('income');
  }, [getCategoriesByTypeAction]);

  const renderLoader = () => (
    <div className='flex justify-center items-center py-8 mt-6'>
      <Empty
        icon={<LoaderCircle className='animate-spin' />}
        title='Загрузка категорий...'
      />
    </div>
  );

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

      {expenseState === 'pending' || incomeState === 'pending' ? (
        renderLoader()
      ) : (
        <>
          <CategoriesList
            title='Категории расходов'
            icon='📉'
            categories={expenseState === 'fulfilled' ? categoriesExpense : []}
          />
          <CategoriesList
            title='Категории доходов'
            icon='📈'
            categories={incomeState === 'fulfilled' ? categoriesIncome : []}
          />
        </>
      )}
    </div>
  );
});
