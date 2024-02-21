import { BASE_API_URL } from '../../../../config/variables';
import { getData } from '../../../../services/AutoMoreiraService';
import {
  IPieStatistic,
  IResponseCompleteStatistic,
  IResponseCompleteVisitor,
  IResponseStatistic,
  IResponseVisitor,
  IVehicleCounter,
  IVisitorCounter
} from '../models/Dasboard';

const getVehicleCounters = async (): Promise<IVehicleCounter> =>
  await getData<IVehicleCounter>(`${BASE_API_URL}api/vehicles/counters`);

const getVehicleLineChart = async (): Promise<IResponseCompleteStatistic> =>
  await getData<IResponseCompleteStatistic>(
    `${BASE_API_URL}api/vehicles/lineChart`
  );

const getVehicleBarChart = async (): Promise<IResponseStatistic> =>
  await getData<IResponseStatistic>(`${BASE_API_URL}api/vehicles/barChart`);

const getVehiclePieChart = async (): Promise<IPieStatistic> =>
  await getData<IPieStatistic>(`${BASE_API_URL}api/vehicles/pieChart`);

const getVisitorCounters = async (): Promise<IVisitorCounter> =>
  await getData<IVisitorCounter>(`${BASE_API_URL}api/visitors/counters`);

const getVisitorLineChart = async (): Promise<IResponseCompleteVisitor> =>
  await getData<IResponseCompleteVisitor>(
    `${BASE_API_URL}api/visitors/lineChart`
  );

const getVisitorBarChart = async (): Promise<IResponseVisitor> =>
  await getData<IResponseVisitor>(`${BASE_API_URL}api/visitors/barChart`);

export {
  getVehicleCounters,
  getVehicleLineChart,
  getVisitorCounters,
  getVisitorLineChart,
  getVehicleBarChart,
  getVisitorBarChart,
  getVehiclePieChart
};
