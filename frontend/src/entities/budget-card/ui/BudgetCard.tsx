import { budgetsApiStore } from '@/shared/stores/budgets';
import { deleteBudgetApi } from '@/shared/stores/budgets/api/delete-budget-api';
import { cn } from '@/shared/utils/tw-merge';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import s from './BudgetCard.module.scss';

export type PeriodType = 'weekly' | 'monthly' | 'yearly';

interface BudgetCardProps {
  id: number;
  icon: string;
  title: string;
  period: PeriodType;
  spentAmount: number;
  limit: number;
  percentageUsed: number;
  remainingAmount: number;
  className?: string;
}

export const BudgetCard = (props: BudgetCardProps) => {
  const {
    id,
    icon,
    title,
    period,
    spentAmount,
    limit,
    percentageUsed,
    remainingAmount,
    className
  } = props;

  const periodTextMap: Record<PeriodType, string> = {
    weekly: 'Недельный',
    monthly: 'Месячный',
    yearly: 'Годовой'
  };

  const handleDelete = async () => {
    try {
      await deleteBudgetApi(id);
      budgetsApiStore.deleteBudgetAction(id);
      toast.success(`Бюджет "${title}" успешно удален`);
    } catch (e) {
      console.error('Failed to delete budget', e);
      toast.error('Ошибка при удалении бюджета');
    }
  };

  return (
    <article className={cn(s.container, className)}>
      <div className={s.intro}>
        <div className={s.description}>
          <span>{icon}</span>
          <div>
            <h3>{title}</h3>
            <p>{periodTextMap[period]} бюджет</p>
          </div>
        </div>
        <button onClick={handleDelete}>
          <Trash2 size={14} className='text-red-400' />
        </button>
      </div>
      <div>
        <div className={s.collection}>
          <p>Потрачено</p>
          <span>
            {new Intl.NumberFormat('ru-RU').format(spentAmount)} ₽ из{' '}
            {new Intl.NumberFormat('ru-RU').format(limit)}
          </span>
        </div>

        <div className={s.chart}>
          <div style={{ width: `${percentageUsed}%` }}></div>
        </div>

        <div className={s.remainder}>
          <p>{percentageUsed}% использовано</p>
          <span>
            Осталось: {new Intl.NumberFormat('ru-RU').format(remainingAmount)} ₽
          </span>
        </div>
      </div>
    </article>
  );
};
