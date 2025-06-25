import { CategoriesList } from '@/widgets/categories-list';
import { Tag } from 'lucide-react';
import { CategoryDialog } from '../../../features/add-category/ui/CategoryDialog';
import s from './Categories.module.scss';

export const Categories = () => {
  return (
    <div className={s.container}>
      <section className={s.introduction}>
        <div className={s.info}>
          <div className={s.logo}>
            <Tag size={20} />
          </div>
          <div>
            <h2>Категории</h2>
            <p>Управление категориями доходов и расходов</p>
          </div>
        </div>
        <CategoryDialog />
      </section>

      <CategoriesList title='Категории расходов' icon='📉' />
      <CategoriesList title='Категории доходов' icon='📈' />
    </div>
  );
};
