import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Actions from '../../../../../../components/table/utils/Actions';
import { RouteName } from '../../../../../../models/enums/RouteType';
import defaultVehicle from '../../../../../../assets/img/vehicles/defaultVehicle.jpg';
import {
  IVehicle,
  IVehicleImage,
  convertBoolean
} from '../../../models/Vehicle';
import { FuelTypeConverted } from '../../../models/enums/FuelEnum';

export const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: '#',
    width: 50
  },
  {
    field: 'vehicleImages',
    headerName: 'Foto',
    width: 150,
    sortable: false,
    filterable: false,
    disableExport: true,
    renderCell: (params: GridRenderCellParams<any, Date>) => {
      const vehicle = params.row as IVehicle;
      let images = params.formattedValue as unknown as IVehicleImage[];
      images = images.slice().sort((a, b) => a.id - b.id);

      return (
        <img
          src={images.length !== 0 ? images[0].url : defaultVehicle}
          alt={`${vehicle.model.mark?.name} ${vehicle.model.name} ${vehicle.version}`}
          loading="lazy"
          className={'h-12'}
        />
      );
    }
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
    filterable: false,
    disableExport: true,
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
