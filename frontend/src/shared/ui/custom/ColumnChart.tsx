import Chart from 'highcharts-react-official';
import Highcharts, { type SeriesOptionsType } from 'highcharts';

interface PieChartProps {
  values: SeriesOptionsType[];
  dates: string[];
}

export const ColumnChart = ({ values, dates }: PieChartProps) => {
  const pieChartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent'
    },
    title: { text: '' },
    legend: { enabled: false },
    xAxis: {
      categories: dates,
      crosshair: true,
      accessibility: { description: '' },
      labels: { style: { color: '#ffffffa0' } }
    },
    yAxis: {
      min: 0,
      gridLineColor: '#ffffff30',
      title: { text: '' },
      labels: {
        style: { color: '#ffffffa0' },
        formatter: ctx => {
          const intl = new Intl.NumberFormat('en', {
            notation: 'compact',
            compactDisplay: 'short',
            maximumFractionDigits: 3
          });

          return intl.format(+ctx.value)
        }
      }
    },
    series: values,
    credits: { enabled: false }
  };

  return <Chart highcharts={Highcharts} options={pieChartOptions} />;
};
