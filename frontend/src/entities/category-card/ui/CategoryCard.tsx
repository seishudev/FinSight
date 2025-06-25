import { cn } from '@shared/utils/tw-merge';
import { Edit2, Trash2 } from 'lucide-react';
import s from './CategoryCard.module.scss';

interface CategoryCardProps {
  id: number;
  name: string;
  icon: string;
}

export const CategoryCard = (props: CategoryCardProps) => {
  const { id, name, icon } = props;

  return (
    <article className={cn(s.container, 'group')}>
      <div className={s.title}>
        <span>{icon}</span>
        <p>{name}</p>
      </div>
      <div className={cn(s.actions, 'group-hover:opacity-100')}>
        <button className={s.edit}>
          <Edit2 size={14} className='text-gray-400' />
        </button>
        <button className={s.delete}>
          <Trash2 size={14} className='text-red-400' />
        </button>
      </div>
    </article>
  );
};
