import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Actions from '../../../../../../components/table/utils/Actions';
import { RouteName } from '../../../../../../models/enums/RouteType';

export const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50
  },
  {
    field: 'name',
    headerName: 'Nome',
    width: 150
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200
  },
  {
    field: 'phoneNumber',
    headerName: 'Contacto',
    width: 150
  },
  {
    field: 'dateTime',
    headerName: 'Data/Hora',
    width: 200,
    valueFormatter: (params) =>
      `${(params.value as Date).toLocaleDateString()} ${(
        params.value as Date
      ).toLocaleTimeString()}`
  },
  {
    field: 'message',
    headerName: 'Mensagem',
    width: 250
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
        editTitle={'Editar mensagem'}
        deleteTitle={'Apagar mensagem'}
        routeName={RouteName.CLIENT_MESSAGES}
        id={Number(params.id)}
      />
    )
  }
];
