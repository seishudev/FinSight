import type { AnalyticsType } from '@/shared/interfaces/AnalyticsType';
import { analyticsPresets } from '@/shared/constants/user-analytics';
import { ExpenseWrapper } from '@/widgets/expense-wrapper';
import s from './user-analytics.module.scss';

interface UserAnalyticsProps {
  type: AnalyticsType;
  amount: number;
}

export const UserAnalytics = ({ type, amount }: UserAnalyticsProps) => {
  const { color, icon, title } = analyticsPresets[type];

  const formattedAmount =
    amount.toLocaleString('ru-RU') + (type !== 'transactions' ? ' ₽' : '');

  return (
    <ExpenseWrapper title={title} icon={icon}>
      <p title={formattedAmount} style={{ color }} className={s.amount}>
        {formattedAmount}
      </p>
    </ExpenseWrapper>
  );
};
