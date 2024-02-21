import ReactApexChart from 'react-apexcharts';
import Card from '../../../../../../components/card';

import { IPieStatistic } from '../../../models/Dasboard';
import { pieChartOptions } from '../../utils/Charts';

const PieChart = ({ pieChart }: { pieChart: IPieStatistic }) => {
  return (
    <Card extra="p-3">
      <div className="mb-6 flex flex-row justify-between px-3 pt-2 ">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            {' Vendas/Stock (%)'}
          </h4>
        </div>
      </div>

      <div className="mb-auto flex h-[220px] w-full items-center justify-center">
        <ReactApexChart
          options={pieChartOptions as any}
          series={[pieChart.totalSales, pieChart.totalStock]}
          type="pie"
          width="100%"
          height="100%"
        />
      </div>
      <div className="flex flex-row !justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-brand-500" />
            <p className="ml-1 text-sm font-normal text-gray-600">
              {'Total Vendidos'}
            </p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700  dark:text-white">
            {`${pieChart.totalSales} %`}
          </p>
        </div>

        <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-[#6AD2FF]" />
            <p className="ml-1 text-sm font-normal text-gray-600">
              {' Total em Stock'}
            </p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
            {`${pieChart.totalStock} %`}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PieChart;
