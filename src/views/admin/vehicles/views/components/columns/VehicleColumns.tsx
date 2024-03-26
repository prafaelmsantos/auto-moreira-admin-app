import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Actions from '../../../../../../components/table/utils/Actions';
import { RouteName } from '../../../../../../models/enums/RouteType';
import defaultVehicle from '../../../../../../assets/img/vehicles/defaultVehicle.jpg';
import { IVehicle, IVehicleImage } from '../../../models/Vehicle';
import { FuelTypeConverted } from '../../../models/enums/FuelEnum';
import { MdCancel, MdCheckCircle } from 'react-icons/md';

export default function columns(refetch: () => void): GridColDef[] {
  return [
    {
      field: 'id',
      headerName: '#',
      width: 50
    },
    {
      field: 'vehicleImages',
      headerName: 'Foto',
      width: 120,
      sortable: false,
      filterable: false,
      disableExport: true,
      renderCell: (params: GridRenderCellParams<any, Date>) => {
        const vehicle = params.row as IVehicle;
        const images = params.formattedValue as unknown as IVehicleImage[];
        return (
          <img
            src={
              images.length !== 0
                ? images.find((x) => x.isMain)?.url ?? defaultVehicle
                : defaultVehicle
            }
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
      width: 140,
      renderCell: (params: GridRenderCellParams<IVehicle, Date>) =>
        (params.row as IVehicle).model?.mark?.name ?? ''
    },
    {
      field: 'model',
      headerName: 'Modelo',
      width: 140,
      valueFormatter: (params) => params.value.name
    },
    {
      field: 'year',
      headerName: 'Ano',
      width: 80
    },
    {
      field: 'fuelType',
      headerName: 'Combustível',
      width: 120,
      valueFormatter: (params) => FuelTypeConverted(params.value)
    },
    {
      field: 'opportunity',
      headerName: 'Oportunidade',
      width: 120,
      renderCell: (params: GridRenderCellParams<any, Date>) => (
        <div className="flex items-center">
          {(params.value as unknown as boolean) ? (
            <MdCheckCircle className="me-1 text-green-500 dark:text-green-300" />
          ) : (
            <MdCancel className="me-1 text-red-500 dark:text-red-300" />
          )}
        </div>
      )
    },
    {
      field: 'sold',
      headerName: 'Vendido',
      width: 100,
      renderCell: (params: GridRenderCellParams<any, Date>) => (
        <div className="flex items-center">
          {(params.value as unknown as boolean) ? (
            <MdCheckCircle className="me-1 text-green-500 dark:text-green-300" />
          ) : (
            <MdCancel className="me-1 text-red-500 dark:text-red-300" />
          )}
        </div>
      )
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
          refetch={refetch}
        />
      )
    }
  ];
}
