import { Stack, Switch, Typography } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { COLORS } from '../../utils/Colors';
import { SwitchSX } from './style/SwitchSX';

type ISwitchFormValidation = {
  checked?: boolean;
  control: Control<any, any>;
  name: string;
  label: string;
  label1: string;
};

export default function SwitchFormValidation({
  control,
  checked,
  name,
  label,
  label1
}: ISwitchFormValidation) {
  const darkMode = useSelector((state: RootState) => state.darkModeSlice.dark);

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{ mx: 1, mt: 1 }}
    >
      <Typography color={darkMode ? 'white' : COLORS.AUTO_MOREIRA_NAVY[700]}>
        {label}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Switch defaultChecked={checked} {...field} sx={SwitchSX()} />
        )}
      />

      <Typography color={darkMode ? 'white' : COLORS.AUTO_MOREIRA_NAVY[700]}>
        {label1}
      </Typography>
    </Stack>
  );
}
