import { DataGrid, GridColDef, GridToolbar, ptBR } from '@mui/x-data-grid';
import { Card } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { COLORS } from '../../utils/Colors';

interface ITable {
  rows: any[];
  loading: boolean;
  columns: GridColDef[];
}

export default function Table({ rows, loading, columns }: ITable) {
  const darkMode = useSelector((state: RootState) => state.darkModeSlice.dark);

  return (
    <Card
      sx={{
        height: 600,
        width: '100%',
        mt: 3,
        bgcolor: darkMode ? COLORS.AUTO_MOREIRA_NAVY[800] : 'white'
      }}
    >
      <DataGrid
        sx={{
          '& .MuiButtonBase-root': {
            color: darkMode ? 'white' : COLORS.AUTO_MOREIRA_NAVY[700]
          },
          '& .MuiInputBase-root.MuiInput-underline': {
            color: darkMode ? 'white' : COLORS.AUTO_MOREIRA_NAVY[700]
          },
          color: darkMode ? 'white' : COLORS.AUTO_MOREIRA_NAVY[700],
          '& .MuiCheckbox-root': {
            color: darkMode ? 'white' : COLORS.AUTO_MOREIRA_NAVY[700]
          },
          '& .MuiDataGrid-sortIcon': {
            color: darkMode ? 'white' : COLORS.AUTO_MOREIRA_NAVY[700]
          },
          '& .MuiTablePagination-selectLabel': {
            color: darkMode ? 'white' : COLORS.AUTO_MOREIRA_NAVY[700]
          },
          '& .MuiToolbar-root': {
            color: darkMode ? 'white' : COLORS.AUTO_MOREIRA_NAVY[700]
          },
          '& .MuiTablePagination-selectIcon': {
            color: darkMode ? 'white' : COLORS.AUTO_MOREIRA_NAVY[700]
          },
          '& .Mui-disabled': {
            color: darkMode
              ? COLORS.AUTO_MOREIRA_GRAY[500]
              : COLORS.AUTO_MOREIRA_NAVY[100]
          }
        }}
        slots={{ toolbar: GridToolbar }}
        disableColumnMenu
        slotProps={{
          toolbar: {
            showQuickFilter: true
          },
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
          noRowsLabel: 'Nenhum resultado encontrado.',
          toolbarExportCSV: 'Exportar CSV'
        }}
        pageSizeOptions={[5, 10, 15, 20]}
        checkboxSelection
        disableRowSelectionOnClick
        {...{ columns, loading, rows }}
      />
    </Card>
  );
}
