import { Calendar, Trash2 } from 'lucide-react';
import s from './TargetCard.module.scss';

interface TargetCardProps {
  icon: string;
  title: string;
  date: Date;
  currentAmount: number;
  targetAmount: number;
  percentageUsed: number;
}

export const TargetCard = (props: TargetCardProps) => {
  const { icon, title, date, currentAmount, targetAmount, percentageUsed } =
    props;

  const getDaysRemaining = (targetDate: Date): string => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const timeDiff = targetDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff < 0) {
      return 'Просрочено';
    } else if (daysDiff === 0) {
      return 'Сегодня';
    } else {
      return `${daysDiff} дн.`;
    }
  };

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
    </article>
  );
};
