import { Grid } from '@mui/material';
import { IMark } from '../../../../models/Mark';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import TextFieldValidation from '../../../../components/validation/TextFieldValidation';

interface IMarkDetails {
  mark: IMark;
  errors: FieldErrors<IMark>;
  register: UseFormRegister<IMark>;
}
export default function MarkDetails({ mark, errors, register }: IMarkDetails) {
  return (
    <Grid container mt={5} px={5}>
      <Grid item xs={12}>
        <TextFieldValidation
          label={'Nome'}
          error={!!errors.name}
          helperText={errors.name?.message}
          register={register('name')}
          defaultValue={mark.name}
        />
      </Grid>
    </Grid>
  );
}
