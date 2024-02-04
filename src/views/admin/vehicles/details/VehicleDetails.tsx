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
import { TextFieldSX } from '../../../../components/form/TextFieldFormValidation';
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

interface IVehicleDetails {
  vehicle: IVehicle;
  marks: IMark[];
  models: IModel[];
}
export default function VehicleDetails({
  vehicle,
  models,
  marks
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
        <TextField
          fullWidth
          id="outlined-basic"
          label="Versão"
          variant="outlined"
          value={vehicle.version}
          sx={TextFieldSX(false)}
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
        <TextField
          fullWidth
          id="outlined-basic"
          label="Ano"
          variant="outlined"
          type="number"
          value={vehicle.year}
          sx={TextFieldSX(false)}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Cor"
          variant="outlined"
          value={vehicle.color}
          sx={TextFieldSX(false)}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Nº de Kms"
          variant="outlined"
          type="number"
          value={vehicle.mileage}
          sx={TextFieldSX(false)}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Preço"
          variant="outlined"
          type="number"
          value={vehicle.price}
          sx={TextFieldSX(false)}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Nº de portas"
          variant="outlined"
          type="number"
          value={vehicle.doors}
          sx={TextFieldSX(false)}
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
        <TextField
          fullWidth
          id="outlined-basic"
          label="Tamanho do motor"
          variant="outlined"
          type="number"
          value={vehicle.engineSize}
          sx={TextFieldSX(false)}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Potência"
          variant="outlined"
          type="number"
          value={vehicle.power}
          sx={TextFieldSX(false)}
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
