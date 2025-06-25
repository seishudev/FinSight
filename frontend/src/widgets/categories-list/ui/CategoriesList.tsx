import type { Category } from '@/shared/stores/categories/interactions/types';
import { CategoryCard } from '@entities/category-card';
import s from './CategoriesList.module.scss';

interface CategoriesListProps {
  title: string;
  icon: string;
  categories: Category[] | null;
}

export const CategoriesList = (props: CategoriesListProps) => {
  const { title, icon, categories } = props;

  return (
    <section className={s.container}>
      <h3 className={s.title}>
        <span className='text-xl lg:text-2xl'>{icon}</span>
        {title}
      </h3>
      <div className={s.wrapper}>
        {categories?.map(categery => (
          <CategoryCard
            key={categery.id}
            name={categery.name}
            icon={categery.icon}
            id={categery.id}
          />
        ))}
      </div>
    </section>
  );
};
