import { Autocomplete, Box, Grid, Stack, TextField } from '@mui/material';

import { IMark } from '../../../../../marks/models/Mark';
import { IModel } from '../../../../../vehicle-models/models/Model';
import { fuels } from '../../../../models/enums/FuelEnum';
import { transmissions } from '../../../../models/enums/TransmissionEnum';
import { Controller, useFormContext } from 'react-hook-form';
import { AutocompleteSX } from '../../../../../../../components/form/style/AutocompleteSX';
import SwitchFormValidation from '../../../../../../../components/form/SwitchFormValidation';
import { IVehicleValidationSchema } from '../../../../services/VehicleValidationSchema';
import AutoMoreiraLabel from '../../../../../../../components/form/AutoMoreiraLabel';
import GeneralCard from '../../../../../identity/users/views/components/card/GeneralCard';
import { VehicleKeys } from '../../../../models/Vehicle';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

interface IVehicleDetails {
  marks: IMark[];
  models: IModel[];
}
export default function VehicleDetails({ models, marks }: IVehicleDetails) {
  const {
    control,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext<IVehicleValidationSchema>();
  const markId = Number(watch(VehicleKeys.modelMarkId));

  const sold = !!watch(VehicleKeys.sold);

  return (
    <Grid container mt={1} px={5} spacing={2} rowSpacing={4}>
      <Grid item md={4} xs={12}>
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
                      error={!!errors.model?.markId}
                      helperText={errors.model?.markId?.message}
                      sx={AutocompleteSX(!!errors.model?.markId)}
                    />
                  )}
                  onChange={(_, data) => {
                    setValue<any>(VehicleKeys.modelId, 0);
                    onChange(data);
                  }}
                />
              )}
              name={VehicleKeys.modelMarkId}
              control={control}
            />
          }
          label={'Marca'}
          error={!!errors.model?.markId}
          required
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <AutoMoreiraLabel
          children={
            <Controller
              render={({ field: { onChange, ...others } }) => (
                <Autocomplete
                  {...others}
                  disabled={markId === 0}
                  sx={{ mt: 1 }}
                  isOptionEqualToValue={(option, value) => option === value}
                  options={models
                    ?.filter((x) => x.markId === markId)
                    ?.map((x) => x.id)}
                  getOptionLabel={(option) =>
                    models
                      ?.filter((x) => x.markId === markId)
                      ?.find((x) => x.id === option)?.name ?? ''
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      variant="standard"
                      error={!!errors.modelId}
                      helperText={errors.modelId?.message}
                      sx={AutocompleteSX(!!errors.modelId)}
                    />
                  )}
                  onChange={(_, data) => onChange(data)}
                />
              )}
              name={VehicleKeys.modelId}
              control={control}
            />
          }
          label={'Modelo'}
          error={!!errors.modelId}
          required
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <GeneralCard
          {...{ errors }}
          control={control}
          required
          name={VehicleKeys.version}
          label={'Versão'}
          error={!!errors.version}
          helperText={errors.version?.message}
          value={''}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <AutoMoreiraLabel
          children={
            <Controller
              render={({ field: { onChange, ...others } }) => (
                <Autocomplete
                  {...others}
                  sx={{ mt: 1 }}
                  isOptionEqualToValue={(option, value) => option === value}
                  options={fuels.map((x) => x.id)}
                  getOptionLabel={(option) =>
                    fuels.find((x) => x.id === option)?.name ?? ''
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      variant="standard"
                      error={!!errors.fuelType}
                      helperText={errors.fuelType?.message}
                      sx={AutocompleteSX(!!errors.fuelType)}
                    />
                  )}
                  onChange={(_, data) => onChange(data)}
                />
              )}
              name={VehicleKeys.fuelType}
              control={control}
            />
          }
          label={'Combustível'}
          error={!!errors.fuelType}
          required
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <GeneralCard
          {...{ errors }}
          control={control}
          required
          name={VehicleKeys.color}
          label={'Cor'}
          error={!!errors.color}
          helperText={errors.color?.message}
          value={''}
        />
      </Grid>
      <Grid item md={2} xs={6}>
        <GeneralCard
          {...{ errors }}
          control={control}
          name={VehicleKeys.year}
          label={'Ano'}
          error={!!errors.year}
          helperText={errors.year?.message}
          type="number"
        />
      </Grid>
      <Grid item md={2} xs={6}>
        <GeneralCard
          {...{ errors }}
          control={control}
          name={VehicleKeys.price}
          label={'Preço'}
          error={!!errors.price}
          helperText={errors.price?.message}
          type="number"
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <AutoMoreiraLabel
          children={
            <Controller
              render={({ field: { onChange, ...others } }) => (
                <Autocomplete
                  {...others}
                  sx={{ mt: 1 }}
                  isOptionEqualToValue={(option, value) => option === value}
                  options={transmissions.map((x) => x.id)}
                  getOptionLabel={(option) =>
                    transmissions.find((x) => x.id === option)?.name ?? ''
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      variant="standard"
                      error={!!errors.transmission}
                      helperText={errors.transmission?.message}
                      sx={AutocompleteSX(!!errors.fuelType)}
                    />
                  )}
                  onChange={(_, data) => onChange(data)}
                />
              )}
              name={VehicleKeys.transmission}
              control={control}
            />
          }
          label={'Combustível'}
          error={!!errors.fuelType}
          required
        />
      </Grid>
      <Grid item md={2} xs={6}>
        <GeneralCard
          {...{ errors }}
          control={control}
          name={VehicleKeys.mileage}
          label={'Nº de Kms'}
          error={!!errors.mileage}
          helperText={errors.mileage?.message}
          type="number"
        />
      </Grid>
      <Grid item md={2} xs={6}>
        <GeneralCard
          {...{ errors }}
          control={control}
          name={VehicleKeys.doors}
          label={'Nº de portas'}
          error={!!errors.doors}
          helperText={errors.doors?.message}
          type="number"
        />
      </Grid>
      <Grid item md={2} xs={6}>
        <GeneralCard
          {...{ errors }}
          control={control}
          name={VehicleKeys.engineSize}
          label={'Tamanho do motor (cm3)'}
          error={!!errors.engineSize}
          helperText={errors.engineSize?.message}
          type="number"
        />
      </Grid>
      <Grid item md={2} xs={6}>
        <GeneralCard
          {...{ errors }}
          control={control}
          name={VehicleKeys.power}
          label={'Potência (CV)'}
          error={!!errors.power}
          helperText={errors.power?.message}
          type="number"
        />
      </Grid>
      <Grid item md={4} lg={4} xs={6}>
        <AutoMoreiraLabel
          label="Oportunidade"
          children={
            <SwitchFormValidation
              {...{ control }}
              label="Não"
              label1="Sim"
              name={VehicleKeys.opportunity}
            />
          }
        />
      </Grid>
      <Grid item md={4} lg={4} xs={6}>
        <AutoMoreiraLabel
          label="Vendido"
          children={
            <SwitchFormValidation
              {...{ control }}
              label="Não"
              label1="Sim"
              name={VehicleKeys.sold}
            />
          }
        />
      </Grid>
      {sold && (
        <Grid item md={4} lg={4} xs={12}>
          <AutoMoreiraLabel
            children={
              <Stack sx={{ mt: 0.6 }}>
                <Controller
                  render={({ field: { value, ...others } }) => (
                    <DatePicker
                      {...others}
                      disableFuture
                      defaultValue={value ? dayjs(value) : dayjs(new Date())}
                      sx={AutocompleteSX(false)}
                      slotProps={{ textField: { variant: 'standard' } }}
                    />
                  )}
                  name={VehicleKeys.soldDate}
                  control={control}
                />
              </Stack>
            }
            label={'Data de venda'}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <GeneralCard
          {...{ errors }}
          control={control}
          name={VehicleKeys.observations}
          label={'Observações'}
          error={!!errors.observations}
          helperText={errors.observations?.message}
          multiline
          rows={6}
        />
      </Grid>
    </Grid>
  );
}
