import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Actions from '../../../../../components/table/utils/Actions';
import { RouteName } from '../../../../../models/enums/RouteType';
import { IVehicle, convertBoolean } from '../../models/Vehicle';
import { FuelTypeConverted } from '../../models/enums/FuelEnum';

export const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50
  },
  {
    field: 'mark',
    headerName: 'Marca',
    width: 150,
    renderCell: (params: GridRenderCellParams<IVehicle, Date>) =>
      (params.row as IVehicle).model?.mark?.name ?? ''
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
    width: 150
  },
  {
    field: 'year',
    headerName: 'Ano',
    width: 100
  },
  {
    field: 'fuelType',
    headerName: 'Combustível',
    width: 150,
    valueFormatter: (params) => FuelTypeConverted(params.value)
  },
  {
    field: 'opportunity',
    headerName: 'Oportunidade',
    width: 150,
    valueFormatter: (params) => convertBoolean(params.value as boolean)
  },
  {
    field: 'sold',
    headerName: 'Vendido',
    width: 100,
    valueFormatter: (params) => convertBoolean(params.value as boolean)
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
