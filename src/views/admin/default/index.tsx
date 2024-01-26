import { IoMdHome } from 'react-icons/io';
import { IoCarSport, IoDocuments } from 'react-icons/io5';
import { MdBarChart, MdDashboard } from 'react-icons/md';

import Widget from '../../../components/widget/Widget';

import tableDataCheck from './variables/tableDataCheck';
import tableDataComplex from './variables/tableDataComplex';
import TotalSpent from './components/TotalSpent';
import WeeklyRevenue from './components/WeeklyRevenue';
import CheckTable from './components/CheckTable';
import DailyTraffic from './components/DailyTraffic';
import MiniCalendar from '../../../components/calendar/MiniCalendar';
import TaskCard from './components/TaskCard';
import ComplexTable from './components/ComplexTable';
import PieChartCard from './components/PieChartCard';

const Dashboard = () => {
  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'Meu Total (unid. este mês)'}
          subtitle={'10'}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={'Total (unid este mês)'}
          subtitle={'134'}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'Total (€ este mês)'}
          subtitle={'€ 534,34'}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={'Meu Total (unid.)'}
          subtitle={'145'}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'Total (unid.)'}
          subtitle={'1.000'}
        />
        <Widget
          icon={<IoCarSport className="h-6 w-6" />}
          title={'Total (€)'}
          subtitle={'€ 2.433,00'}
        />
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Check Table */}
        <div>
          <DailyTraffic />
        </div>

        {/* Traffic chart & Pie Chart */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <PieChartCard />
          <MiniCalendar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
