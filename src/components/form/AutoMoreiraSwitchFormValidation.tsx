import { Stack, Switch, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { COLORS } from '../../utils/Colors';
import { SwitchSX } from './style/SwitchSX';

type IAutoMoreiraSwitchFormValidation = {
  name: string;
  label: string;
  label1: string;
};

export default function AutoMoreiraSwitchFormValidation({
  name,
  label,
  label1
}: IAutoMoreiraSwitchFormValidation) {
  const darkMode = useSelector((state: RootState) => state.darkModeSlice.dark);

  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0 }}>
      <Typography color={darkMode ? 'white' : COLORS.AUTO_MOREIRA_NAVY[700]}>
        {label}
      </Typography>
      <Controller
        name={name}
        render={({ field: { onChange, value } }) => (
          <Switch onChange={onChange} checked={!!value} sx={SwitchSX()} />
        )}
      />

      <Typography color={darkMode ? 'white' : COLORS.AUTO_MOREIRA_NAVY[700]}>
        {label1}
      </Typography>
    </Stack>
  );
}
