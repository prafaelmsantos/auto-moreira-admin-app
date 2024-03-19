import { Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { IRoleValidationSchema } from '../../services/RoleValidationSchema';
import { RoleKeys } from '../../models/Role';
import GeneralCard from '../../../users/views/components/card/GeneralCard';

export default function RoleDetails() {
  const {
    control,
    watch,
    formState: { errors }
  } = useFormContext<IRoleValidationSchema>();

  const roleId = Number(watch(RoleKeys.id));

  return (
    <Grid container mt={5} px={5}>
      <Grid item xs={12}>
        <GeneralCard
          {...{ errors }}
          control={control}
          required
          name={RoleKeys.name}
          label={'Nome'}
          error={!!errors.name}
          helperText={errors.name?.message}
          value={''}
          disabled={roleId === 1}
        />
      </Grid>
    </Grid>
  );
}
