import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Actions from '../../../../../../components/table/utils/Actions';
import { RouteName } from '../../../../../../models/enums/RouteType';
import { MdCheckCircle, MdOutlineError } from 'react-icons/md';
import { Status } from '../../../models/enums/StatusEnum';

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
    field: 'createdDate',
    headerName: 'Data/Hora',
    width: 200,
    type: 'dateTime',
    valueFormatter: (params) =>
      `${(params.value as Date).toLocaleDateString()} ${(
        params.value as Date
      ).toLocaleTimeString()}`
  },
  {
    field: 'status',
    headerName: 'Estado',
    width: 150,
    type: 'singleSelect',
    valueOptions: () => [
      {
        value: 1,
        label: 'Aberto'
      },
      {
        value: 2,
        label: 'Fechado'
      }
    ],
    renderCell: (params: GridRenderCellParams<any, Date>) => (
      <div className="flex items-center">
        {(params.value as unknown as Status) === Status.OPEN ? (
          <>
            <MdOutlineError className="me-2 text-amber-500 dark:text-amber-300" />
            {'Aberto'}
          </>
        ) : (
          <>
            <MdCheckCircle className="me-2 text-green-500 dark:text-green-300" />
            {'Fechado'}
          </>
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
        editTitle={'Editar mensagem'}
        deleteTitle={'Apagar mensagem'}
        routeName={RouteName.CLIENT_MESSAGES}
        id={Number(params.id)}
      />
    )
  }
];
