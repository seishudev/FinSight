import { budgetsApiStore } from '@/shared/stores/budgets';
import { addFundsApi } from '@/shared/stores/budgets/api/add-funds-api';
import { deleteTargetApi } from '@/shared/stores/budgets/api/delete-target-api';
import { getDaysRemaining } from '@shared/utils/remaining-days';
import { Calendar, Trash2 } from 'lucide-react';
import s from './TargetCard.module.scss';

interface TargetCardProps {
  id: number;
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
    id,
    icon,
    title,
    date,
    currentAmount,
    targetAmount,
    remainingAmount,
    percentageUsed
  } = props;

  const handleDelete = async () => {
    try {
      await deleteTargetApi(id);
      budgetsApiStore.getTargetsAction();
    } catch (e) {
      console.error('Failed to delete target', e);
    }
  };

  const handleFundAction = async (amount: number) => {
    try {
      await addFundsApi(id, amount);
      budgetsApiStore.getTargetsAction();
    } catch (e) {
      console.error('Failed to update target funds', e);
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
        <button onClick={handleDelete}>
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
          <button onClick={() => handleFundAction(-1000)}>-1.000 ₽</button>
          <button onClick={() => handleFundAction(1000)}>+1.000 ₽</button>
        </div>
      </div>
    </article>
  );
};
