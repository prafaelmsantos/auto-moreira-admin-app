import { Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { ModelKeys } from '../../models/Model';
import { IMark } from '../../../marks/models/Mark';
import { IModelValidationSchema } from '../../services/ModelValidationSchema';
import GeneralCard from '../../../users/views/components/card/GeneralCard';
import AutoCompleteFormValidation from '../../../../../components/form/AutoCompleteFormValidation';

interface IModelDetails {
  marks: IMark[];
}

export default function ModelDetails({ marks }: IModelDetails) {
  const {
    control,
    formState: { errors }
  } = useFormContext<IModelValidationSchema>();

  return (
    <Grid container mt={5} px={5} spacing={2}>
      <Grid item md={6} xs={12}>
        <GeneralCard
          {...{ errors }}
          control={control}
          required
          name={ModelKeys.name}
          label={'Nome'}
          error={!!errors.name}
          helperText={errors.name?.message}
          value={''}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <AutoCompleteFormValidation
          {...{ errors }}
          control={control}
          required
          name={ModelKeys.markId}
          label={'Marca'}
          error={!!errors.markId}
          helperText={errors.markId?.message}
          defaultValue={''}
          options={marks}
        />
      </Grid>
    </Grid>
  );
}
