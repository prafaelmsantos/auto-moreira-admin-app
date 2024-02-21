import { Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import TextFieldFormValidation from '../../../../../components/form/TextFieldFormValidation';
import { IRoleValidationSchema } from '../../services/RoleValidationSchema';
import { RoleKeys } from '../../models/Role';

export default function RoleDetails() {
  const {
    control,
    formState: { errors }
  } = useFormContext<IRoleValidationSchema>();

  return (
    <Grid container mt={5} px={5}>
      <Grid item xs={12}>
        <TextFieldFormValidation
          label={'Nome'}
          error={!!errors.name}
          helperText={errors.name?.message}
          control={control}
          name={RoleKeys.name}
          required
        />
      </Grid>
    </Grid>
  );
}
