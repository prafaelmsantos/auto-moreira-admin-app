import { useQuery } from '@apollo/client';
import Table from '../../../components/table';
import { columns } from './utils/Utils';
import { VEHICLES } from '../../../queries/Vehicles';
import {
  vehicles_vehicles_nodes,
  vehicles
} from '../../../queries/types/vehicles';
import { convertToVehicle } from '../../../models/Vehicle';

export default function Vehicles() {
  const { data, loading } = useQuery<vehicles>(VEHICLES);

  const rows =
    data?.vehicles?.nodes?.map((vehicle) =>
      convertToVehicle(vehicle as vehicles_vehicles_nodes)
    ) ?? [];

  return (
    <main>
      <Table {...{ rows, loading, columns }} />
    </main>
  );
}
