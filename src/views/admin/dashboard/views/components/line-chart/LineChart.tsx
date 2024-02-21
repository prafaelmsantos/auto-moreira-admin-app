import Card from '../../../../../../components/card';
import { lineChartOptions } from '../../utils/Charts';
import ReactApexChart from 'react-apexcharts';
import ValuePerc from '../../utils/ValuePerc';

interface ILineChart {
  value: string;
  valuePerc: number;
  statistics: number[];
  lastStatistics: number[];
  title: string;
  name1: string;
  name2: string;
}
const LineChart = ({
  value,
  title,
  name1,
  name2,
  statistics,
  lastStatistics,
  valuePerc
}: ILineChart) => {
  const lineChartData = [
    {
      name: name1,
      data: statistics,
      color: '#4318FF'
    },
    {
      name: name2,
      data: lastStatistics,
      color: '#6AD2FF'
    }
  ];

  return (
    <Card extra="!p-[20px] text-center">
      <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="flex flex-col">
          <p className="mt-1 text-xl font-bold text-navy-700 dark:text-white">
            {value}
          </p>
          <div className="flex flex-col items-start">
            <p className="mt-2 text-sm text-gray-600">{title}</p>
            <div className="flex flex-row items-center justify-center">
              <ValuePerc valuePerc={valuePerc} />
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          <ReactApexChart
            options={lineChartOptions as any}
            series={lineChartData}
            type="line"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </Card>
  );
};

export default LineChart;
