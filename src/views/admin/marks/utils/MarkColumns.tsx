import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Actions from '../../../../components/table/utils/Actions';
import { RouteName } from '../../../../models/enums/RouteType';

export const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 90
  },
  {
    field: 'name',
    headerName: 'Nome',
    width: 200
  },
  {
    field: 'actions',
    headerName: 'Ações',
    width: 150,
    sortable: false,
    renderCell: (params: GridRenderCellParams<any, Date>) => (
      <Actions
        editTitle={'Editar Marca'}
        deleteTitle={'Apagar Marca'}
        routeName={RouteName.MARKS}
        id={Number(params.id)}
      />
    )
  }
];
