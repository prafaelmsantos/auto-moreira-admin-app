import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Actions from '../../../../../../../components/table/utils/Actions';
import { RouteName } from '../../../../../../../models/enums/RouteType';
import { IRole } from '../../../../roles/models/Role';
export default function columns(refetch: () => void): GridColDef[] {
  return [
    {
      field: 'id',
      headerName: '#',
      width: 50
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250
    },
    {
      field: 'firstName',
      headerName: 'Primeiro Nome',
      width: 150
    },
    {
      field: 'lastName',
      headerName: 'Ultimo Nome',
      width: 150
    },
    {
      field: 'phoneNumber',
      headerName: 'Telemóvel',
      width: 120
    },
    {
      field: 'roles',
      headerName: 'Cargo',
      width: 150,
      valueFormatter: (params) =>
        (params.value as IRole[])[0].name ?? 'Sem cargo'
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
          deleteDisabled={Number(params.id) === 1}
          editTitle={'Editar Utilizador'}
          deleteTitle={'Apagar Utilizador'}
          routeName={RouteName.USERS}
          id={Number(params.id)}
          refetch={refetch}
        />
      )
    }
  ];
}
