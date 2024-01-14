import { DataGrid, GridColDef, ptBR } from '@mui/x-data-grid';
import { Box } from '@mui/material';

interface ITable {
  rows: any[];
  loading: boolean;
  columns: GridColDef[];
}

export default function index({ rows, loading, columns }: ITable) {
  return (
    <Box sx={{ height: 600, width: '100%', mt: 3 }}>
      <DataGrid
        /* sx={{
          '& .MuiCheckbox-root svg': {
            color: `${'white'}`
          },
          '& .MuiDataGrid-sortIcon': { color: 'white' },
          '& .MuiTablePagination-selectLabel': { color: 'white' },
          '& .MuiToolbar-root': { color: 'white' },
          '& .MuiTablePagination-selectIcon': {
            color: 'white'
          },
          '& .css-i4bv87-MuiSvgIcon-root': {
            color: 'white'
          }
        }} */
        //className="dark:text-white"
        disableColumnMenu
        slotProps={{
          pagination: {
            labelRowsPerPage: 'Items por página'
          }
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10
            }
          }
        }}
        localeText={{
          ...ptBR.components.MuiDataGrid.defaultProps.localeText,
          noRowsLabel: 'Nenhum resultado encontrado.'
        }}
        pageSizeOptions={[5, 10, 15, 20]}
        checkboxSelection
        disableRowSelectionOnClick
        {...{ columns, loading, rows }}
      />
    </Box>
  );
}
