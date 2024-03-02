import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Actions from '../../../../../../components/table/utils/Actions';
import { RouteName } from '../../../../../../models/enums/RouteType';
import { IRole } from '../../../../roles/models/Role';
export const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: '#',
    width: 50
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 300
  },
  {
    field: 'firstName',
    headerName: 'Primeiro Nome',
    width: 180
  },
  {
    field: 'lastName',
    headerName: 'Ultimo Nome',
    width: 180
  },
  {
    field: 'phoneNumber',
    headerName: 'Telemóvel',
    width: 200
  },
  {
    field: 'roles',
    headerName: 'Cargo',
    width: 200,
    valueFormatter: (params) => (params.value as IRole[])[0].name ?? 'Sem cargo'
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
        editTitle={'Editar Utilizador'}
        deleteTitle={'Apagar Utilizador'}
        routeName={RouteName.USERS}
        id={Number(params.id)}
      />
    )
  }
];
