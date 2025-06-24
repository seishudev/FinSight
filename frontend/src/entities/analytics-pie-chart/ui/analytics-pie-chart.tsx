import { cloneElement, type JSX } from 'react';

import { PieChart } from '@/shared/ui/custom';
import { ExpenseWrapper } from '@/widgets/expense-wrapper';
import s from './analytics-pie-chart.module.scss';

interface AnalyticsPieChartProps {
  title: string;
  icon: JSX.Element;
  emptyText?: string;
  pieceTitle: string;
  values: number[];
}

export const AnalyticsPieChart = ({
  title,
  icon,
  values,
  pieceTitle,
  emptyText = 'Нет данных'
}: AnalyticsPieChartProps) => {
  return (
    <ExpenseWrapper title={title} icon={icon} className={s.wrapper}>
      {values.length == 0 ? (
        <div className={s.empty}>
          {cloneElement(icon, { color: '#9ca3af', size: 48 })}
          <p>{emptyText}</p>
        </div>
      ) : (
        <div className={s.chart}>
          <PieChart
            values={values.map(n => ({ name: pieceTitle, y: n }))}
            pieceLabel={"Рублей"}
            size={300}
          />
        </div>
      )}
    </ExpenseWrapper>
  );
};
