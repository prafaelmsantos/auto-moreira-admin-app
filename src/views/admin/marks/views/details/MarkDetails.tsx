import { Grid } from '@mui/material';
import { MarkKeys } from '../../models/Mark';
import TextFieldCard from '../../../identity/users/views/components/card/AutoMoreiraTextFieldCard';
import { IMarkValidationSchema } from '../../services/MarkValidationSchema';
import { useFormContext } from 'react-hook-form';

export default function MarkDetails() {
  const {
    formState: { errors }
  } = useFormContext<IMarkValidationSchema>();

  return (
    <Grid container mt={3} px={5}>
      <Grid item xs={12}>
        <TextFieldCard
          {...{ errors }}
          required
          name={MarkKeys.name}
          label={'Nome'}
          error={!!errors.name}
          helperText={errors.name?.message}
          value={''}
        />
      </Grid>
    </Grid>
  );
}
