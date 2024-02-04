import { Grid } from '@mui/material';
import { IMark } from '../models/Mark';
import { Control, FieldErrors } from 'react-hook-form';
import TextFieldFormValidation from '../../../../components/form/TextFieldFormValidation';

interface IMarkDetails {
  mark: IMark;
  errors: FieldErrors<IMark>;
  control: Control<IMark>;
}
export default function MarkDetails({ mark, errors, control }: IMarkDetails) {
  return (
    <Grid container mt={5} px={5}>
      <Grid item xs={12}>
        <TextFieldFormValidation
          label={'Nome'}
          error={!!errors.name}
          helperText={errors.name?.message}
          control={control}
          defaultValue={mark.name}
          name={'name'}
        />
      </Grid>
    </Grid>
  );
}
