import { useQuery } from '@apollo/client';
import Table from '../../../components/table/Table';
import { VEHICLES } from './queries/Vehicles';
import { convertToVehicle } from './models/Vehicle';
import { useNavigate } from 'react-router-dom';
import GetActions from '../../../components/base/Actions';
import PageHolder from '../../../components/base/PageHolder';
import { IMode } from '../../../models/enums/Base';
import { addVehicleNavigate } from './views/utils/Utils';
import { columns } from './views/components/VehicleColumns';
import { vehicles_vehicles_nodes, vehicles } from './queries/types/vehicles';
import { useEffect } from 'react';

export default function Vehicles() {
  const navigate = useNavigate();
  const { data, loading, refetch } = useQuery<vehicles>(VEHICLES);

  const rows =
    data?.vehicles?.nodes
      ?.map((vehicle) => convertToVehicle(vehicle as vehicles_vehicles_nodes))
      ?.sort((a, b) => a.id - b.id) ?? [];

  const handleAdd = () => navigate(addVehicleNavigate);

  useEffect(() => {
    void refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <PageHolder
        actions={GetActions({
          mode: IMode.LIST,
          handleAdd
        })}
      />
      <Table {...{ rows, loading, columns }} />
    </main>
  );
}
