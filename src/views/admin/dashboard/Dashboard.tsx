import MiniCalendar from '../../../components/calendar/MiniCalendar';
import { useEffect, useState } from 'react';
import {
  IPieStatistic,
  IResponseCompleteStatistic,
  IResponseCompleteVisitor,
  IResponseStatistic,
  IResponseVisitor
} from './models/Dasboard';
import {
  getVehicleBarChart,
  getVehicleLineChart,
  getVehiclePieChart,
  getVisitorBarChart,
  getVisitorLineChart
} from './services/DashboardService';
import { useAppDispatch } from '../../../redux/hooks';
import { setLoader, setToInitialLoader } from '../../../redux/loaderSlice';
import CarWidget from './views/components/car-widget/CarWidget';
import LineChart from './views/components/line-chart/LineChart';
import { CurrencyFormatter } from '../../../utils/Helppers';
import BarChart from './views/components/bar-chart/BarChart';
import PieChart from './views/components/pie-chart/PieChart';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const [vehicleLineChart, setVehicleLineChart] =
    useState<IResponseCompleteStatistic>({
      lastStatistics: [],
      statistics: [],
      value: 0,
      valuePerc: 0
    });

  const [vehicleBarChart, setVehicleBarChart] = useState<IResponseStatistic>({
    statistics: [],
    value: 0,
    valuePerc: 0
  });

  const [visitorLineChart, setVisitorLineChart] =
    useState<IResponseCompleteVisitor>({
      lastVisitors: [],
      visitors: [],
      value: 0,
      valuePerc: 0
    });

  const [visitorBarChart, setVisitorBarChart] = useState<IResponseVisitor>({
    visitors: [],
    value: 0,
    valuePerc: 0
  });

  const [pieChart, setPieChart] = useState<IPieStatistic>({
    totalStock: 0,
    totalSales: 0
  });

  useEffect(() => {
    dispatch(setLoader(true));
    getVehicleLineChart()
      .then((data) => {
        setVehicleLineChart(data);
        dispatch(setToInitialLoader());
      })
      .catch((e) => {
        console.error(e);
        dispatch(setToInitialLoader());
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(setLoader(true));
    getVehicleBarChart()
      .then((data) => {
        setVehicleBarChart(data);
        dispatch(setToInitialLoader());
      })
      .catch((e) => {
        console.error(e);
        dispatch(setToInitialLoader());
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(setLoader(true));
    getVisitorLineChart()
      .then((data) => {
        setVisitorLineChart(data);
        dispatch(setToInitialLoader());
      })
      .catch((e) => {
        console.error(e);
        dispatch(setToInitialLoader());
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(setLoader(true));
    getVisitorBarChart()
      .then((data) => {
        setVisitorBarChart(data);
        dispatch(setToInitialLoader());
      })
      .catch((e) => {
        console.error(e);
        dispatch(setToInitialLoader());
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(setLoader(true));
    getVehiclePieChart()
      .then((data) => {
        setPieChart(data);
        dispatch(setToInitialLoader());
      })
      .catch((e) => {
        console.error(e);
        dispatch(setToInitialLoader());
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <CarWidget />

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <LineChart
          value={CurrencyFormatter.format(vehicleLineChart.value)}
          valuePerc={vehicleLineChart.valuePerc}
          title={`Vendas ${new Date().getFullYear()}`}
          statistics={
            vehicleLineChart.statistics.length !== 0
              ? vehicleLineChart.statistics.map((x) => x.value)
              : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
          lastStatistics={
            vehicleLineChart.lastStatistics.length !== 0
              ? vehicleLineChart.lastStatistics.map((x) => x.value)
              : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
          name1={
            vehicleLineChart.statistics.length !== 0
              ? vehicleLineChart.statistics[0].year.toString()
              : ''
          }
          name2={
            vehicleLineChart.lastStatistics.length !== 0
              ? vehicleLineChart.lastStatistics[0].year.toString()
              : ''
          }
        />

        <LineChart
          valuePerc={visitorLineChart.valuePerc}
          value={visitorLineChart.value.toString()}
          title={`Visitantes ${new Date().getFullYear()}`}
          statistics={
            visitorLineChart.visitors.length !== 0
              ? visitorLineChart.visitors.map((x) => x.value)
              : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
          lastStatistics={
            visitorLineChart.lastVisitors.length !== 0
              ? visitorLineChart.lastVisitors.map((x) => x.value)
              : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
          name1={
            visitorLineChart.visitors.length !== 0
              ? visitorLineChart.visitors[0].year.toString()
              : ''
          }
          name2={
            visitorLineChart.lastVisitors.length !== 0
              ? visitorLineChart.lastVisitors[0].year.toString()
              : ''
          }
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <BarChart
            title={'Vendas'}
            name={
              vehicleBarChart.statistics.length !== 0
                ? vehicleBarChart.statistics[0].year.toString()
                : ''
            }
            value={CurrencyFormatter.format(vehicleBarChart.value)}
            valuePerc={vehicleBarChart.valuePerc}
            statistics={vehicleBarChart.statistics.map((x) => x.value)}
          />
          <BarChart
            title={'Visitantes'}
            name={
              visitorBarChart.visitors.length !== 0
                ? visitorBarChart.visitors[0].year.toString()
                : ''
            }
            value={visitorBarChart.value.toString()}
            valuePerc={visitorBarChart.valuePerc}
            statistics={visitorBarChart.visitors.map((x) => x.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <PieChart {...{ pieChart }} />
          <MiniCalendar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
