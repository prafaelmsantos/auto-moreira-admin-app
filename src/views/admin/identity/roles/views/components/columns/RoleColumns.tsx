import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Actions from '../../../../../../../components/table/utils/Actions';
import { RouteName } from '../../../../../../../models/enums/RouteType';
import { RoleKeys } from '../../../models/Role';

export default function columns(refetch: () => void): GridColDef[] {
  return [
    {
      field: RoleKeys.id,
      headerName: '#',
      width: 50
    },
    {
      field: RoleKeys.name,
      headerName: 'Nome',
      width: 200
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 100,
      sortable: false,
      filterable: false,
      disableExport: true,
      renderCell: (params: GridRenderCellParams<Date>) => (
        <Actions
          deleteDisabled={Number(params.id) === 1}
          editTitle={'Editar cargo'}
          deleteTitle={'Apagar cargo'}
          routeName={RouteName.ROLES}
          id={Number(params.id)}
          refetch={refetch}
        />
      )
    }
  ];
}
