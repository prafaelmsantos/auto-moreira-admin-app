import { Tooltip, IconButton } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { FuelTypeConverted } from '../../../../models/enums/FuelEnum';

export const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 100
  },
  {
    field: 'mark',
    headerName: 'Marca',
    width: 150,
    valueFormatter: (params) => params.value.name
  },
  {
    field: 'model',
    headerName: 'Modelo',
    width: 150,
    valueFormatter: (params) => params.value.name
  },
  {
    field: 'version',
    headerName: 'Versão',
    width: 200
  },
  {
    field: 'year',
    headerName: 'Ano',
    width: 150
  },
  {
    field: 'fuelType',
    headerName: 'Combustível',
    width: 200,
    valueFormatter: (params) => FuelTypeConverted(params.value)
  },
  {
    field: 'actions',
    headerName: 'Ações',
    width: 100,
    sortable: false,
    renderCell: (params: GridRenderCellParams<any, Date>) => (
      <>
        <Tooltip title="Edit Order" arrow>
          <IconButton
            sx={{
              '&:hover': {
                background: blue[100]
              },
              color: blue[500]
            }}
            color="inherit"
            size="small"
          >
            <EditTwoToneIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Order" arrow>
          <IconButton
            sx={{
              '&:hover': { background: red[100] },
              color: red[500]
            }}
            color="inherit"
            size="small"
          >
            <DeleteTwoToneIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </>
    )
  }
];
