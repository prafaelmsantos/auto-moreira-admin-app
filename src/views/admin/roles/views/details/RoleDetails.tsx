import { Grid } from '@mui/material';
import { Control, FieldErrors } from 'react-hook-form';
import TextFieldFormValidation from '../../../../../components/form/TextFieldFormValidation';
import { IRole } from '../../models/Role';

interface IRoleDetails {
  role: IRole;
  errors: FieldErrors<IRole>;
  control: Control<IRole>;
}
export default function RoleDetails({ role, errors, control }: IRoleDetails) {
  return (
    <Grid container mt={5} px={5}>
      <Grid item xs={12}>
        <TextFieldFormValidation
          label={'Nome'}
          error={!!errors.name}
          helperText={errors.name?.message}
          control={control}
          defaultValue={role.name}
          name={'name'}
          required
        />
      </Grid>
    </Grid>
  );
}
