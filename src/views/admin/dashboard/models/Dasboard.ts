import { MONTH } from './enums/MonthsEnum';

export interface ICounter {
  units: number;
  values: number;
}

export interface IVehicleCounter {
  totalSalesMonth: ICounter;
  totalSales: ICounter;
  totalStock: ICounter;
}

export interface IVisitorCounter {
  total: number;
  totalMonth: number;
}

export interface IStatistic {
  year: number;
  month: MONTH;
  value: number;
}

export interface IResponseStatistic {
  statistics: IStatistic[];
  value: number;
  valuePerc: number;
}

export interface IResponseCompleteStatistic extends IResponseStatistic {
  lastStatistics: IStatistic[];
}

export interface IVisitor {
  year: number;
  month: MONTH;
  value: number;
}
export interface IResponseVisitor {
  visitors: IStatistic[];
  value: number;
  valuePerc: number;
}

export interface IResponseCompleteVisitor extends IResponseVisitor {
  lastVisitors: IVisitor[];
}

export interface IPieStatistic {
  totalStock: number;
  totalSales: number;
}
