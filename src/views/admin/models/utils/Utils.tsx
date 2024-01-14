import { Tooltip, IconButton } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

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
