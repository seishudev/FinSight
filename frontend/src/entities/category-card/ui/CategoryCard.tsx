import { EditCategory } from '@/features/edit-category';
import { categoriesApiStore } from '@/shared/stores/categories';
import { deleteCategory } from '@/shared/stores/categories/api/delete-category';
import type { CategoryType } from '@/shared/stores/categories/interactions/types';
import { cn } from '@shared/utils/tw-merge';
import { Trash2 } from 'lucide-react';
import s from './CategoryCard.module.scss';

interface CategoryCardProps {
  id: number;
  name: string;
  icon: string;
  categoryType: CategoryType;
}

export const CategoryCard = (props: CategoryCardProps) => {
  const { id, name, icon, categoryType } = props;

  const handleDelete = async () => {
    try {
      const data = await deleteCategory(id);
      categoriesApiStore.getCategoriesByTypeAction(categoryType);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <article className={cn(s.container, 'group')}>
      <div className={s.title}>
        <span>{icon}</span>
        <p>{name}</p>
      </div>
      <div className={cn(s.actions, 'group-hover:opacity-100')}>
        <EditCategory
          id={id}
          name={name}
          icon={icon}
          initialCategoryType={categoryType}
        />
        <button onClick={handleDelete} className={s.delete}>
          <Trash2 size={14} className='text-red-400' />
        </button>
      </div>
    </article>
  );
};
