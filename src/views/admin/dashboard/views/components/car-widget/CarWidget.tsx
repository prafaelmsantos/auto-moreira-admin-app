import { MdBarChart } from 'react-icons/md';
import Widget from '../../../../../../components/widget/Widget';
import { useAppDispatch } from '../../../../../../redux/hooks';
import { useState, useEffect } from 'react';
import {
  setLoader,
  setToInitialLoader
} from '../../../../../../redux/loaderSlice';
import { IVehicleCounter, IVisitorCounter } from '../../../models/Dasboard';
import {
  getVehicleCounters,
  getVisitorCounters
} from '../../../services/DashboardService';
import { CurrencyFormatter } from '../../../../../../utils/Helppers';

const CarWidget = () => {
  const dispatch = useAppDispatch();
  const [vehicleCounter, setVehicleCounter] = useState<IVehicleCounter>({
    totalSales: { values: 0, units: 0 },
    totalSalesMonth: { values: 0, units: 0 },
    totalStock: { values: 0, units: 0 }
  });

  const [visitorCounter, setVisitorCounter] = useState<IVisitorCounter>({
    total: 0,
    totalMonth: 0
  });

  useEffect(() => {
    dispatch(setLoader(true));
    getVehicleCounters()
      .then((data) => {
        setVehicleCounter(data);
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
    getVisitorCounters()
      .then((data) => {
        setVisitorCounter(data);
        dispatch(setToInitialLoader());
      })
      .catch((e) => {
        console.error(e);
        dispatch(setToInitialLoader());
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4">
      <Widget
        icon={<MdBarChart className="h-7 w-7" />}
        title={'Total Vendas (€ este mês)'}
        subtitle={CurrencyFormatter.format(
          vehicleCounter.totalSalesMonth.values
        )}
      />

      <Widget
        icon={<MdBarChart className="h-7 w-7" />}
        title={'Total Vendas (Unid. este mês)'}
        subtitle={`${vehicleCounter.totalSalesMonth.units}`}
      />

      <Widget
        icon={<MdBarChart className="h-7 w-7" />}
        title={'Total Vendas (€)'}
        subtitle={CurrencyFormatter.format(vehicleCounter.totalSales.values)}
      />

      <Widget
        icon={<MdBarChart className="h-7 w-7" />}
        title={'Total Vendas (Unid.)'}
        subtitle={`${vehicleCounter.totalSales.units}`}
      />

      <Widget
        icon={<MdBarChart className="h-7 w-7" />}
        title={'Total Stock (€)'}
        subtitle={CurrencyFormatter.format(vehicleCounter.totalStock.values)}
      />

      <Widget
        icon={<MdBarChart className="h-7 w-7" />}
        title={'Total Stock (Unid.)'}
        subtitle={`${vehicleCounter.totalStock.units}`}
      />

      <Widget
        icon={<MdBarChart className="h-7 w-7" />}
        title={'Total Visitantes (este mês)'}
        subtitle={`${visitorCounter.total}`}
      />

      <Widget
        icon={<MdBarChart className="h-7 w-7" />}
        title={'Total Visitantes'}
        subtitle={`${visitorCounter.totalMonth}`}
      />
    </div>
  );
};

export default CarWidget;
