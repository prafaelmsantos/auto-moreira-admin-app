import { Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { IRoleValidationSchema } from '../../services/RoleValidationSchema';
import { RoleKeys } from '../../models/Role';
import TextFieldCard from '../../../users/views/components/card/TextFieldCard';

export default function RoleDetails() {
  const {
    control,
    watch,
    formState: { errors }
  } = useFormContext<IRoleValidationSchema>();

  const userId = Number(watch('id'));

  return (
    <Grid container mt={3} px={5}>
      <Grid item xs={12}>
        <TextFieldCard
          {...{ errors }}
          disabled={userId === 1 || userId === 2}
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
