import { Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { IRoleValidationSchema } from '../../services/RoleValidationSchema';
import { RoleKeys } from '../../models/Role';
import TextFieldCard from '../../../users/views/components/card/TextFieldCard';

export default function RoleDetails() {
  const {
    control,
    formState: { errors }
  } = useFormContext<IRoleValidationSchema>();

  return (
    <Grid container mt={3} px={5}>
      <Grid item xs={12}>
        <TextFieldCard
          {...{ errors }}
          control={control}
          required
          name={RoleKeys.name}
          label={'Nome'}
          error={!!errors.name}
          helperText={errors.name?.message}
          value={''}
        />
      </Grid>
    </Grid>
  );
}
