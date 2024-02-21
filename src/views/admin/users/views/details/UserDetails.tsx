import { Control, Controller, FieldErrors } from 'react-hook-form';
import { IUser } from '../../models/User';
import { Autocomplete, Grid, TextField } from '@mui/material';
import GeneralCard from '../components/card/GeneralCard';
import { AutocompleteSX } from '../../../../../components/form/style/AutocompleteSX';
import { IRole } from '../../../roles/models/Role';

interface IUserDetails {
  user: IUser;
  errors: FieldErrors<IUser>;
  control: Control<IUser>;
  roles: IRole[];
}
export default function UserDetails({
  user,
  errors,
  control,
  roles
}: IUserDetails) {
  return (
    <Grid container mt={5} px={5} spacing={3}>
      <Grid item md={6} xs={12}>
        <GeneralCard
          required
          name={'firstName'}
          label={'Primeiro Nome'}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          value={user.firstName ?? ''}
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
          value={user.lastName ?? ''}
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
          value={user.userName ?? ''}
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
          value={user.email ?? ''}
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
          value={user.phoneNumber ?? ''}
          {...{ errors, control }}
        />
      </Grid>

      <Grid item md={6} xs={12}>
        <div className="items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">{'Cargos*'}</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
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
              defaultValue={user.roles}
            />
          </p>
        </div>
      </Grid>
    </Grid>
  );
}
