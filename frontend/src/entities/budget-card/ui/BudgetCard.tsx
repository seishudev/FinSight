import { Trash2 } from 'lucide-react';
import s from './BudgetCard.module.scss';

export type PeriodType = 'weekly' | 'monthly' | 'yearly';

interface BudgetCardProps {
  icon: string;
  title: string;
  period: PeriodType;
  spentAmount: number;
  limit: number;
  percentageUsed: number;
  remainingAmount: number;
}

export const BudgetCard = (props: BudgetCardProps) => {
  const {
    icon,
    title,
    period,
    spentAmount,
    limit,
    percentageUsed,
    remainingAmount
  } = props;

  const periodTextMap: Record<PeriodType, string> = {
    weekly: 'Недельный',
    monthly: 'Месячный',
    yearly: 'Годовой'
  };

  return (
    <article className={s.container}>
      <div className={s.intro}>
        <div className={s.description}>
          <span>{icon}</span>
          <div>
            <h3>{title}</h3>
            <p>{periodTextMap[period]} бюджет</p>
          </div>
        </div>
        <button>
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
