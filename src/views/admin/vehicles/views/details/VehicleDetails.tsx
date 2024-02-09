import { Autocomplete, Grid, TextField } from '@mui/material';
import TextFieldFormValidation from '../../../../../components/form/TextFieldFormValidation';

import { IVehicle } from '../../models/Vehicle';
import { IMark } from '../../../marks/models/Mark';
import { IModel } from '../../../models/models/Model';
import { fuels } from '../../models/enums/FuelEnum';
import { transmissions } from '../../models/enums/TransmissionEnum';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue
} from 'react-hook-form';
import { AutocompleteSX } from '../../../../../components/form/style/AutocompleteSX';
import SwitchFormValidation from '../../../../../components/form/SwitchFormValidation';

interface IVehicleDetails {
  vehicle: IVehicle;
  marks: IMark[];
  models: IModel[];
  errors: FieldErrors<IVehicle>;
  control: Control<IVehicle>;
  setValue: UseFormSetValue<IVehicle>;
}
export default function VehicleDetails({
  vehicle,
  models,
  marks,
  errors,
  control,
  setValue
}: IVehicleDetails) {
  return (
    <Grid container mt={4} px={5} spacing={2} rowSpacing={4}>
      <Grid item md={4} xs={12}>
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
                  error={!!errors.model?.markId}
                  helperText={errors.model?.markId?.message}
                  sx={AutocompleteSX(!!errors.model?.markId)}
                />
              )}
              onChange={(_, data) => {
                setValue('modelId', 0);
                field.onChange(data);
              }}
            />
          )}
          name={'model.markId'}
          control={control}
          defaultValue={marks.find((x) => x.id === vehicle.model.markId)?.id}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <Controller
          render={({ field }) => (
            <Autocomplete
              {...field}
              sx={{ mt: 1 }}
              isOptionEqualToValue={(option, value) => option === value}
              options={models.map((x) => x.id)}
              getOptionLabel={(option) =>
                models.find((x) => x.id === option)?.name ?? ''
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label={'Modelo'}
                  variant="outlined"
                  error={!!errors.modelId}
                  helperText={errors.modelId?.message}
                  sx={AutocompleteSX(!!errors.modelId)}
                />
              )}
              onChange={(_, data) => field.onChange(data)}
            />
          )}
          disabled={vehicle.model.markId === 0}
          name={'modelId'}
          control={control}
          defaultValue={models.find((x) => x.id === vehicle.modelId)?.id}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <TextFieldFormValidation
          label={'Versão'}
          error={!!errors.version}
          helperText={errors.version?.message}
          control={control}
          defaultValue={vehicle.version}
          name={'version'}
          required
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <Controller
          render={({ field }) => (
            <Autocomplete
              {...field}
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
                  label={'Combustível'}
                  variant="outlined"
                  error={!!errors.fuelType}
                  helperText={errors.fuelType?.message}
                  sx={AutocompleteSX(!!errors.fuelType)}
                />
              )}
              onChange={(_, data) => field.onChange(data)}
            />
          )}
          name={'fuelType'}
          control={control}
          defaultValue={fuels.find((x) => x.id === vehicle.fuelType)?.id}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <TextFieldFormValidation
          label={'Cor'}
          error={!!errors.color}
          helperText={errors.color?.message}
          control={control}
          defaultValue={vehicle.color}
          name={'color'}
          required
        />
      </Grid>
      <Grid item md={2} xs={6}>
        <TextFieldFormValidation
          label={'Ano'}
          control={control}
          defaultValue={vehicle.year}
          name={'year'}
          type="number"
        />
      </Grid>
      <Grid item md={2} xs={6}>
        <TextFieldFormValidation
          label={'Preço'}
          control={control}
          defaultValue={vehicle.price}
          name={'price'}
          type="number"
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <Controller
          render={({ field }) => (
            <Autocomplete
              {...field}
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
                  label={'Transmissão'}
                  variant="outlined"
                  error={!!errors.fuelType}
                  helperText={errors.fuelType?.message}
                  sx={AutocompleteSX(!!errors.fuelType)}
                />
              )}
              onChange={(_, data) => field.onChange(data)}
            />
          )}
          name={'transmission'}
          control={control}
          defaultValue={
            transmissions.find((x) => x.id === vehicle.transmission)?.id
          }
        />
      </Grid>
      <Grid item md={2} xs={6}>
        <TextFieldFormValidation
          label={'Nº de Kms'}
          control={control}
          defaultValue={vehicle.mileage}
          name={'mileage'}
          type="number"
        />
      </Grid>
      <Grid item md={2} xs={6}>
        <TextFieldFormValidation
          label={'Nº de portas'}
          control={control}
          defaultValue={vehicle.doors}
          name={'doors'}
          type="number"
        />
      </Grid>
      <Grid item md={2} xs={6}>
        <TextFieldFormValidation
          label={'Tamanho do motor'}
          control={control}
          defaultValue={vehicle.engineSize}
          name={'engineSize'}
          type="number"
        />
      </Grid>
      <Grid item md={2} xs={6}>
        <TextFieldFormValidation
          label={'Potência'}
          control={control}
          defaultValue={vehicle.power}
          name={'power'}
          type="number"
        />
      </Grid>
      <Grid item md={2} xs={6}>
        <SwitchFormValidation
          {...{ control }}
          label="Não"
          label1="Sim"
          title="Oportunidade"
          checked={vehicle.opportunity}
          name="opportunity"
        />
      </Grid>
      <Grid item md={2} xs={6}>
        <SwitchFormValidation
          {...{ control }}
          label="Não"
          label1="Sim"
          title="Vendido"
          checked={vehicle.sold}
          name="sold"
        />
      </Grid>
      <Grid item md={12} xs={12}>
        <TextFieldFormValidation
          label={'Observações'}
          control={control}
          defaultValue={vehicle.observations}
          name={'observations'}
          type="string"
          multiline
          rows={6}
        />
      </Grid>
    </Grid>
  );
}
