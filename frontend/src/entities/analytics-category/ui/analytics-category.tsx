import type { SpendingCategorie } from '@/shared/interfaces/SpendingCategorie';
import { cn } from '@/shared/utils/tw-merge';
import s from './analytics-category.module.scss';

interface AnalyticsCategorieProps
  extends Omit<SpendingCategorie, 'categoryId'> {
  gradient: string;
}

export const AnalyticsCategory = ({
  totalAmount,
  categoryName,
  percentage,
  gradient
}: AnalyticsCategorieProps) => {
  return (
    <div className={s.container}>
      <section className={s.characteristic}>
        <div className={cn(s.icon, gradient)} />

        <h3 className={s.transactionCategory}>{categoryName}</h3>
      </section>

      <div>
        <p className={s.amount}>{totalAmount} ₽</p>
        <p className={s.percentage}>{percentage}%</p>
      </div>
    </div>
  );
};
