import type { Category } from '@/shared/stores/categories/types';
import { Empty } from '@/shared/ui/custom';
import { CategoryCard } from '@entities/category-card';
import { FolderX } from 'lucide-react';
import s from './CategoriesList.module.scss';

interface CategoriesListProps {
  title: string;
  icon: string;
  categories: Category[] | null;
}

export const CategoriesList = (props: CategoriesListProps) => {
  const { title, icon, categories } = props;

  if (!categories) {
    return null;
  }

  return (
    <section className={s.container}>
      <h3 className={s.title}>
        <span className='text-xl lg:text-2xl'>{icon}</span>
        {title}
      </h3>
      {categories.length > 0 ? (
        <div className={s.wrapper}>
          {categories.map(category => (
            <CategoryCard
              key={category.id}
              name={category.name}
              icon={category.icon}
              id={category.id}
              categoryType={category.type}
            />
          ))}
        </div>
      ) : (
        <Empty
          icon={<FolderX />}
          title='Категории отсутствуют'
          description={`Добавьте свою первую категорию для раздела "${title}", чтобы начать отслеживать транзакции.`}
        />
      )}
    </section>
  );
};
