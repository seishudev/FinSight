import { type JSX } from 'react';
import type { PointOptionsObject } from 'highcharts';

import { Empty, PieChart } from '@/shared/ui/custom';
import { ExpenseWrapper } from '@/widgets/expense-wrapper';
import s from './analytics-pie-chart.module.scss';

interface AnalyticsPieChartProps {
  title: string;
  icon: JSX.Element;
  emptyText?: string;
  emptyDesc?: string;
  pieceTitle: string;
  values: PointOptionsObject[];
}

export const AnalyticsPieChart = ({
  title,
  icon,
  values,
  pieceTitle,
  emptyDesc,
  emptyText = 'Нет данных'
}: AnalyticsPieChartProps) => {
  return (
    <ExpenseWrapper title={title} icon={icon} className={s.wrapper}>
      {values.length == 0 ? (
        <Empty
          link='/'
          linkLabel='Создать'
          icon={icon}
          className={s.empty}
          title={emptyText}
          description={emptyDesc}
        />
      ) : (
        <div className={s.chart}>
          <PieChart
            values={values}
            pieceLabel={`${pieceTitle} (рублей)`}
            size={300}
          />
        </div>
      )}
    </ExpenseWrapper>
  );
};
