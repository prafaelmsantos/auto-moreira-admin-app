import { Autocomplete, Grid, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { ModelKeys } from '../../models/Model';
import { IMark } from '../../../marks/models/Mark';
import { IModelValidationSchema } from '../../services/ModelValidationSchema';
import GeneralCard from '../../../identity/users/views/components/card/GeneralCard';
import AutoMoreiraLabel from '../../../../../components/form/AutoMoreiraLabel';
import { AutocompleteSX } from '../../../../../components/form/style/AutocompleteSX';

export default function ModelDetails({ marks }: { marks: IMark[] }) {
  const {
    control,
    formState: { errors }
  } = useFormContext<IModelValidationSchema>();

  return (
    <Grid container mt={3} px={5} spacing={2}>
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
        <AutoMoreiraLabel
          children={
            <Controller
              render={({ field: { onChange, ...others } }) => (
                <Autocomplete
                  {...others}
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
                      variant="standard"
                      error={!!errors.markId}
                      helperText={errors.markId?.message}
                      sx={AutocompleteSX(!!errors.markId)}
                    />
                  )}
                  onChange={(_, data) => onChange(data)}
                />
              )}
              name={ModelKeys.markId}
              control={control}
            />
          }
          label={'Marca'}
          error={!!errors.markId}
          required
        />
      </Grid>
    </Grid>
  );
}
