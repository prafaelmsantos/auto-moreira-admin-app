import { Autocomplete, Grid, TextField } from '@mui/material';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { IModel } from '../../models/Model';
import { IMark } from '../../../marks/models/Mark';
import TextFieldFormValidation from '../../../../../components/form/TextFieldFormValidation';
import { AutocompleteSX } from '../../../../../components/form/style/AutocompleteSX';

interface IModelDetails {
  model: IModel;
  errors: FieldErrors<IModel>;
  marks: IMark[];
  control: Control<IModel>;
}
export default function ModelDetails({
  model,
  errors,
  marks,
  control
}: IModelDetails) {
  return (
    <Grid container mt={5} px={5} spacing={2}>
      <Grid item md={6} xs={12}>
        <TextFieldFormValidation
          label={'Nome'}
          error={!!errors.name}
          helperText={errors.name?.message}
          control={control}
          defaultValue={model.name}
          name={'name'}
          required
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <Controller
          render={({ field }) => (
            <Autocomplete
              {...field}
              sx={{ mt: 1 }}
              isOptionEqualToValue={(option, value) => option === value}
              options={marks.map((x) => x.id)}
              getOptionLabel={(option) =>
                marks.find((x) => x.id === option)?.name ?? ''
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label={'Marca'}
                  variant="outlined"
                  error={!!errors.markId}
                  helperText={errors.markId?.message}
                  sx={AutocompleteSX(!!errors.markId)}
                />
              )}
              onChange={(_, data) => field.onChange(data)}
            />
          )}
          name={'markId'}
          control={control}
          defaultValue={marks.find((x) => x.id === model.markId)?.id}
        />
      </Grid>
    </Grid>
  );
}
