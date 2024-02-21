import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { RouteName } from '../../../../../models/enums/RouteType';
import Actions from '../../../../../components/table/utils/Actions';

export const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: '#',
    width: 50
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
    filterable: false,
    disableExport: true,
    renderCell: (params: GridRenderCellParams<any, Date>) => (
      <Actions
        editTitle={'Editar modelo'}
        deleteTitle={'Apagar modelo'}
        routeName={RouteName.MODELS}
        id={Number(params.id)}
      />
    )
  }
];
