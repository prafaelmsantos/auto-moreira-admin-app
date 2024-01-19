import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { RouteName } from '../../../../models/enums/RouteType';
import Actions from '../../../../components/table/utils/Actions';

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
    field: 'mark',
    headerName: 'Marca',
    width: 150,
    valueFormatter: (params) => params.value.name
  },
  {
    field: 'actions',
    headerName: 'Ações',
    width: 150,
    sortable: false,
    renderCell: (params: GridRenderCellParams<any, Date>) => (
      <Actions
        editTitle={'Editar Modelo'}
        deleteTitle={'Apagar Modelo'}
        routeName={RouteName.MODELS}
        id={Number(params.id)}
      />
    )
  }
];

export const modelListNavigate = '/admin/models';
export const addModelNavigate = '/admin/models/add';
