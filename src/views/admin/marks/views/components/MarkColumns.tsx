import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Actions from '../../../../../components/table/utils/Actions';
import { RouteName } from '../../../../../models/enums/RouteType';
import { MarkKeys } from '../../models/Mark';

export default function columns(refetch: () => void): GridColDef[] {
  return [
    {
      field: MarkKeys.id,
      headerName: '#',
      width: 50
    },
    {
      field: MarkKeys.name,
      headerName: 'Nome',
      width: 200
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 150,
      sortable: false,
      filterable: false,
      disableExport: true,
      renderCell: (params: GridRenderCellParams<any, Date>) => (
        <Actions
          editTitle={'Editar Marca'}
          deleteTitle={'Apagar Marca'}
          routeName={RouteName.MARKS}
          id={Number(params.id)}
          refetch={refetch}
        />
      )
    }
  ];
}
