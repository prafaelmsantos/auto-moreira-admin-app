import { useQuery } from '@apollo/client';
import Table from '../../../components/table/Table';
import { addVehicleNavigate, columns } from './utils/Utils';
import { VEHICLES } from '../../../queries/Vehicles';
import {
  vehicles_vehicles_nodes,
  vehicles
} from '../../../queries/types/vehicles';
import { convertToVehicle } from '../../../models/Vehicle';
import { useNavigate } from 'react-router-dom';
import GetActions from '../../../components/base/Actions';
import PageHolder from '../../../components/base/PageHolder';
import { IMode } from '../../../models/enums/Base';

export default function Vehicles() {
  const navigate = useNavigate();
  const { data, loading } = useQuery<vehicles>(VEHICLES);

  const rows =
    data?.vehicles?.nodes?.map((vehicle) =>
      convertToVehicle(vehicle as vehicles_vehicles_nodes)
    ) ?? [];

  const handleAdd = () => navigate(addVehicleNavigate);
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
