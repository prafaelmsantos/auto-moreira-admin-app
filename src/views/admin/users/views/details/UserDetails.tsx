import { Controller, useFormContext } from 'react-hook-form';
import { Autocomplete, Grid, TextField } from '@mui/material';
import GeneralCard from '../components/card/GeneralCard';
import { AutocompleteSX } from '../../../../../components/form/style/AutocompleteSX';
import { IRole } from '../../../roles/models/Role';
import { IUserValidationSchema } from '../../services/UserValidationSchema';
import AutoMoreiraLabel from '../../../../../components/form/AutoMoreiraLabel';

interface IUserDetails {
  roles: IRole[];
}
export default function UserDetails({ roles }: IUserDetails) {
  const {
    control,
    formState: { errors }
  } = useFormContext<IUserValidationSchema>();

  return (
    <Grid container mt={5} px={5} spacing={3}>
      <Grid item md={6} xs={12}>
        <GeneralCard
          required
          name={'firstName'}
          label={'Primeiro Nome'}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          value={''}
          {...{ errors, control }}
        />
      </Grid>

      <Grid item md={6} xs={12}>
        <GeneralCard
          required
          name={'lastName'}
          label={'Ultimo Nome'}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          value={''}
          {...{ errors, control }}
        />
      </Grid>

      <Grid item md={6} xs={12}>
        <GeneralCard
          required
          name={'userName'}
          label={'Nome de Utilizador'}
          error={!!errors.userName}
          helperText={errors.userName?.message}
          value={''}
          {...{ errors, control }}
        />
      </Grid>

      <Grid item md={6} xs={12}>
        <GeneralCard
          required
          name={'email'}
          label={'Email'}
          error={!!errors.email}
          helperText={errors.email?.message}
          value={''}
          {...{ errors, control }}
        />
      </Grid>

      <Grid item md={6} xs={12}>
        <GeneralCard
          required
          name={'phoneNumber'}
          label={'Telemóvel'}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
          value={''}
          {...{ errors, control }}
        />
      </Grid>

      <Grid item md={6} xs={12}>
        <AutoMoreiraLabel
          label="Cargo"
          children={
            <Controller
              render={({ field: { value, ...field } }) => (
                <Autocomplete
                  {...field}
                  value={value && value.length !== 0 ? value[0] : undefined}
                  sx={{ mt: 1 }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  options={roles}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      variant="standard"
                      error={!!errors.roles}
                      helperText={errors.roles?.message}
                      sx={AutocompleteSX(!!errors.roles)}
                    />
                  )}
                  onChange={(_, data) => field.onChange([data])}
                />
              )}
              name={'roles'}
              control={control}
              //defaultValue={user.roles}
            />
          }
        />
      </Grid>
    </Grid>
  );
}
