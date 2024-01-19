import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { FuelTypeConverted } from '../../../../models/enums/FuelEnum';
import Actions from '../../../../components/table/utils/Actions';
import { RouteName } from '../../../../models/enums/RouteType';

export const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 100
  },
  {
    field: 'mark',
    headerName: 'Marca',
    width: 150,
    valueFormatter: (params) => params.value.name
  },
  {
    field: 'model',
    headerName: 'Modelo',
    width: 150,
    valueFormatter: (params) => params.value.name
  },
  {
    field: 'version',
    headerName: 'Versão',
    width: 200
  },
  {
    field: 'year',
    headerName: 'Ano',
    width: 150
  },
  {
    field: 'fuelType',
    headerName: 'Combustível',
    width: 200,
    valueFormatter: (params) => FuelTypeConverted(params.value)
  },
  {
    field: 'actions',
    headerName: 'Ações',
    width: 100,
    sortable: false,
    renderCell: (params: GridRenderCellParams<any, Date>) => (
      <Actions
        editTitle={'Editar Veículo'}
        deleteTitle={'Apagar Veículo'}
        routeName={RouteName.VEHICLES}
        id={Number(params.id)}
      />
    )
  }
];

export const vehicleListNavigate = '/admin/vehicles';
export const addVehicleNavigate = '/admin/vehicles/add';
