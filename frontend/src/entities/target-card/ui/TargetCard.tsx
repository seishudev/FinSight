import { getDaysRemaining } from '@shared/utils/remaining-days';
import { Calendar, Trash2 } from 'lucide-react';
import s from './TargetCard.module.scss';

interface TargetCardProps {
  icon: string;
  title: string;
  date: Date;
  currentAmount: number;
  targetAmount: number;
  remainingAmount: number;
  percentageUsed: number;
}

export const TargetCard = (props: TargetCardProps) => {
  const {
    icon,
    title,
    date,
    currentAmount,
    targetAmount,
    remainingAmount,
    percentageUsed
  } = props;

  return (
    <article className={s.container}>
      <div className={s.intro}>
        <div className={s.description}>
          <span>{icon}</span>
          <div>
            <h3>{title}</h3>
          </div>
        </div>
        <button>
          <Trash2 size={14} className='text-red-400' />
        </button>
      </div>
      <div>
        <div className={s.collection}>
          <p>Накоплено</p>
          <span>
            {new Intl.NumberFormat('ru-RU').format(currentAmount)} ₽ из{' '}
            {new Intl.NumberFormat('ru-RU').format(targetAmount)}
          </span>
        </div>

        <div className={s.chart}>
          <div style={{ width: `${percentageUsed}%` }}></div>
        </div>

        <div className={s.remainder}>
          <p>{percentageUsed}% достигнуто</p>
          <span>
            <Calendar size={12} />
            {getDaysRemaining(date)}
          </span>
        </div>
      </div>

      <div className={s.money}>
        <p>
          💡 Осталось накопить:{' '}
          {new Intl.NumberFormat('ru-RU').format(remainingAmount)} ₽
        </p>
        <div className={s.actions}>
          <button>-1.000 ₽</button>
          <button>+1.000 ₽</button>
        </div>
      </div>
    </article>
  );
};
