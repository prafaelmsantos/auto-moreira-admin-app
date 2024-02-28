import { Typography } from '@mui/material';
import { RootState } from '../../../../../../redux/store';
import { useSelector } from 'react-redux';
import { COLORS } from '../../../../../../utils/Colors';

export default function ClientMessageLabel(
  field: string | number | boolean,
  isLabel: boolean = false
) {
  const darkMode = useSelector((state: RootState) => state.darkModeSlice.dark);
  return (
    <Typography
      sx={{ fontWeight: isLabel ? 'bold' : undefined }}
      color={darkMode ? 'white' : COLORS.AUTO_MOREIRA_NAVY[700]}
    >
      {field}
    </Typography>
  );
}
