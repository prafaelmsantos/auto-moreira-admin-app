import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Actions from '../../../../../../../components/table/utils/Actions';
import { RouteName } from '../../../../../../../models/enums/RouteType';
import { IRole, RoleKeys } from '../../../models/Role';
export const columns: GridColDef[] = [
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
        disabled={(params.row as unknown as IRole).isDefault}
        editTitle={'Editar cargo'}
        deleteTitle={'Apagar cargo'}
        routeName={RouteName.ROLES}
        id={Number(params.id)}
      />
    )
  }
];
