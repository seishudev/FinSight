import type { AnalyticsType } from '@/shared/interfaces/AnalyticsType';
import { ExpenseWrapper } from '@/widgets/expense-wrapper';
import s from './user-analytics.module.scss';
import { analyticsPresets } from '@/shared/constants/user-analytics'

interface UserAnalyticsProps {
  type: AnalyticsType;
  amount: number;
}

export const UserAnalytics = ({ type, amount }: UserAnalyticsProps) => {
  const { color, icon, title } = analyticsPresets[type];

  return (
    <ExpenseWrapper title={title} icon={icon}>
      <p style={{ color }} className={s.amount}>{amount} ₽</p>
    </ExpenseWrapper>
  );
};
