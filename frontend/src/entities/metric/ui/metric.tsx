import { cn } from '@/shared/utils/tw-merge';
import { metricPresets } from '@/shared/constants/user-metric';
import type { MetricType } from '@/shared/interfaces/MetricType';
import { ExpenseWrapper } from '@/widgets/expense-wrapper';
import s from './metric.module.scss';

interface MetricProps {
  emoji: string;
  title: string;
  amount: number;
  type: MetricType;
  className?: string;
}

export const Metric = ({
  emoji,
  title,
  amount,
  type,
  className,
}: MetricProps) => {
    const { gradient, color, icon } = metricPresets[type];

  return (
    <ExpenseWrapper className={cn("hover-card", className)}>
      <div className={s.header}>
        <div className={cn(s.icon, gradient)}>{icon}</div>
        <p>{emoji}</p>
      </div>

      <h3 className={s.title}>{title}</h3>
      <p className={s.indicator} style={{ color }}>{amount.toLocaleString('ru-RU')} ₽</p>
    </ExpenseWrapper>
  );
};
