import Chart from 'highcharts-react-official';
import Highcharts, { type SeriesOptionsType } from 'highcharts';

interface PieChartProps {
  values: SeriesOptionsType[];
}

export const ColumnChart = ({ values }: PieChartProps) => {
  const pieChartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
    },
    title: {
      text: ''
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      categories: ['', '', '', '', '', ''],
      crosshair: true,
      accessibility: {
        description: ''
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: ''
      }
    },
    series: values,
    credits: { enabled: false }
  };

  return <Chart highcharts={Highcharts} options={pieChartOptions} />;
};
