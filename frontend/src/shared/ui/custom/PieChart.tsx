import Chart from 'highcharts-react-official';
import Highcharts, { type PointOptionsObject } from 'highcharts';

interface PieChartProps {
  values: PointOptionsObject[];
  pieceLabel: string;
  size?: number;
}

export const PieChart = ({ values, pieceLabel, size }: PieChartProps) => {
  const pieChartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      height: size,
      width: size
    },
    title: {
      text: ''
    },
    plotOptions: {
      pie: {
        dataLabels: [{ enabled: false }, { enabled: false }]
      }
    },
    series: [
      {
        type: 'pie',
        name: pieceLabel,
        data: values
      }
    ],
    credits: { enabled: false }
  };

  return <Chart highcharts={Highcharts} options={pieChartOptions} />;
};
