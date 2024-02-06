import {
  Autocomplete,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
  alpha,
  styled
} from '@mui/material';
import TextFieldFormValidation, {
  TextFieldSX
} from '../../../../components/form/TextFieldFormValidation';
import { AutocompleteFormValidationSX } from '../../../../components/form/AutocompleteFormValidation';
import { IVehicle } from '../models/Vehicle';
import { IMark } from '../../marks/models/Mark';
import { IModel } from '../../models/models/Model';
import { Fuel, fuels } from '../models/enums/FuelEnum';
import { transmissions } from '../models/enums/TransmissionEnum';
import { pink } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { COLORS } from '../../../../utils/Colors';
import { Control, FieldErrors } from 'react-hook-form';

interface IVehicleDetails {
  vehicle: IVehicle;
  marks: IMark[];
  models: IModel[];
  errors: FieldErrors<IVehicle>;
  control: Control<IVehicle>;
}
export default function VehicleDetails({
  vehicle,
  models,
  marks,
  errors,
  control
}: IVehicleDetails) {
  const darkMode = useSelector((state: RootState) => state.darkModeSlice.dark);
  console.log(Object.entries(Fuel));
  return (
    <Grid container mt={5} px={5} spacing={2} rowSpacing={4}>
      <Grid item md={4} xs={12}>
        <Autocomplete
          id="marca"
          options={marks}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Marca" />}
          sx={AutocompleteFormValidationSX(false)}
          value={marks.find((x) => x.id === vehicle.model.markId) ?? null}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <Autocomplete
          disabled={vehicle?.model?.markId === 0}
          id="models"
          options={models}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Modelo" />}
          sx={AutocompleteFormValidationSX(false)}
          value={models.find((x) => x.id === vehicle.modelId) ?? null}
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
        <Autocomplete
          id="combustiveis"
          options={fuels}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="Combustível" />
          )}
          sx={AutocompleteFormValidationSX(false)}
          value={fuels.find((x) => x.id === vehicle.fuelType)}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <TextFieldFormValidation
          label={'Ano'}
          control={control}
          defaultValue={vehicle.year}
          name={'year'}
          type="number"
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
      <Grid item md={4} xs={12}>
        <TextFieldFormValidation
          label={'Nº de Kms'}
          control={control}
          defaultValue={vehicle.mileage}
          name={'mileage'}
          type="number"
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <TextFieldFormValidation
          label={'Preço'}
          control={control}
          defaultValue={vehicle.price}
          name={'price'}
          type="number"
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <TextFieldFormValidation
          label={'Nº de portas'}
          control={control}
          defaultValue={vehicle.doors}
          name={'doors'}
          type="number"
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <Autocomplete
          id="transmissões"
          options={transmissions}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="Transmissão" />
          )}
          sx={AutocompleteFormValidationSX(false)}
          value={transmissions.find((x) => x.id === vehicle.transmission)}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <TextFieldFormValidation
          label={'Tamanho do motor'}
          control={control}
          defaultValue={vehicle.engineSize}
          name={'engineSize'}
          type="number"
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <TextFieldFormValidation
          label={'Potência'}
          control={control}
          defaultValue={vehicle.power}
          name={'power'}
          type="number"
        />
      </Grid>
      <Grid item md={2} xs={12}>
        <Typography color={darkMode ? 'white' : COLORS.AUTO_MOREIRA_NAVY[700]}>
          Oportunidade
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography
            color={darkMode ? 'white' : COLORS.AUTO_MOREIRA_NAVY[700]}
          >
            Não
          </Typography>
          <Switch
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: darkMode
                  ? COLORS.AUTO_MOREIRA_BRAND[400]
                  : COLORS.AUTO_MOREIRA_BRAND[500]
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: darkMode
                  ? COLORS.AUTO_MOREIRA_BRAND[400]
                  : COLORS.AUTO_MOREIRA_BRAND[500]
              },
              '& .MuiSwitch-track': {
                backgroundColor: COLORS.AUTO_MOREIRA_BRAND[100]
              }
            }}
            checked={vehicle.opportunity}
          />
          <Typography
            color={darkMode ? 'white' : COLORS.AUTO_MOREIRA_NAVY[700]}
          >
            Sim
          </Typography>
        </Stack>
      </Grid>
      <Grid item md={2} xs={12}>
        <Typography color={darkMode ? 'white' : COLORS.AUTO_MOREIRA_NAVY[700]}>
          Vendido
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography
            color={darkMode ? 'white' : COLORS.AUTO_MOREIRA_NAVY[700]}
          >
            Não
          </Typography>
          <Switch
            checked={vehicle.sold}
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: darkMode
                  ? COLORS.AUTO_MOREIRA_BRAND[400]
                  : COLORS.AUTO_MOREIRA_BRAND[500]
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: darkMode
                  ? COLORS.AUTO_MOREIRA_BRAND[400]
                  : COLORS.AUTO_MOREIRA_BRAND[500]
              },
              '& .MuiSwitch-track': {
                backgroundColor: COLORS.AUTO_MOREIRA_BRAND[100]
              }
            }}
          />
          <Typography
            color={darkMode ? 'white' : COLORS.AUTO_MOREIRA_NAVY[700]}
          >
            Sim
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}
