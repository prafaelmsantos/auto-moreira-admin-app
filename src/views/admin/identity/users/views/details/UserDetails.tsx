import { Controller, useFormContext } from 'react-hook-form';
import { Autocomplete, Grid, TextField } from '@mui/material';
import GeneralCard from '../components/card/GeneralCard';
import { IRole } from '../../../roles/models/Role';
import { IUserValidationSchema } from '../../services/UserValidationSchema';
import AutoMoreiraLabel from '../../../../../../components/form/AutoMoreiraLabel';
import { TextFieldSX } from '../../../../../../components/form/style/TextFieldSX';

interface IUserDetails {
  roles: IRole[];
}
export default function UserDetails({ roles }: IUserDetails) {
  const {
    control,
    watch,
    formState: { errors }
  } = useFormContext<IUserValidationSchema>();

  const userId = Number(watch('id'));

  return (
    <Grid container mt={3} px={5} spacing={3}>
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
          name={'email'}
          label={'Email'}
          error={!!errors.email}
          helperText={errors.email?.message}
          value={''}
          {...{ errors, control }}
        />
      </Grid>

      <Grid item md={3} xs={12}>
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

      <Grid item md={3} xs={12}>
        <AutoMoreiraLabel
          children={
            <Controller
              render={({ field: { onChange, value, ...others } }) => (
                <Autocomplete
                  {...others}
                  sx={{ mt: 1 }}
                  value={value[0] ?? null}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  options={roles}
                  getOptionLabel={(option) =>
                    roles.find((x) => x.id === option.id)?.name ?? ''
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      variant="standard"
                      error={!!errors.roles}
                      helperText={errors.roles?.message}
                      sx={TextFieldSX(!!errors.roles)}
                      InputProps={{
                        disableUnderline: userId === 1
                      }}
                      disabled={userId === 1}
                    />
                  )}
                  onChange={(_, data) => onChange(data ? [data] : [])}
                />
              )}
              name={'roles'}
              control={control}
            />
          }
          label={'Cargo'}
          error={!!errors.roles}
          required
        />
      </Grid>
    </Grid>
  );
}
