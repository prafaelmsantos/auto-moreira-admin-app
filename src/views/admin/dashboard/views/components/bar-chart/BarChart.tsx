import Card from '../../../../../../components/card';
import Chart from 'react-apexcharts';
import { barChartOptions } from '../../utils/Charts';
import ValuePerc from '../../utils/ValuePerc';

interface IBarchar {
  title: string;
  name: string;
  value: string;
  valuePerc: number;
  statistics: number[];
}
const BarChart = ({ title, value, valuePerc, statistics, name }: IBarchar) => {
  return (
    <Card extra="pb-7 p-[20px]">
      <div className="flex flex-row justify-between">
        <div className="ml-1 pt-2">
          <p className="text-sm font-medium leading-4 text-gray-600">{title}</p>
          <p className="text-xl font-bold text-navy-700 dark:text-white">
            {value}
            <span className="mx-1 text-sm font-medium leading-6 text-gray-600">
              este mês
            </span>
          </p>
        </div>
        <div className="mt-2 flex items-start">
          <div className="flex items-center text-sm text-green-500">
            <ValuePerc valuePerc={valuePerc} />
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full pb-0 pt-10">
        <Chart
          options={barChartOptions as any}
          series={[
            {
              name: name,
              data: statistics
            }
          ]}
          type="bar"
          width="100%"
          height="100%"
        />
      </div>
    </Card>
  );
};

export default BarChart;
