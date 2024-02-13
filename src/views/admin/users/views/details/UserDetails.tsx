import { Control, FieldErrors } from 'react-hook-form';
import { IUser } from '../../models/User';
import { Grid } from '@mui/material';
import TextFieldFormValidation from '../../../../../components/form/TextFieldFormValidation';

interface IUserDetails {
  user: IUser;
  errors: FieldErrors<IUser>;
  control: Control<IUser>;
}
export default function UserDetails({ user, errors, control }: IUserDetails) {
  return (
    <Grid container mt={5} px={5}>
      <Grid item xs={12}>
        <TextFieldFormValidation
          label={'Primeiro Nome'}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          control={control}
          defaultValue={user.firstName}
          name={'firstName'}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextFieldFormValidation
          label={'Ultimo Nome'}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          control={control}
          defaultValue={user.lastName}
          name={'lastName'}
        />
      </Grid>
      <Grid item xs={12}>
        <TextFieldFormValidation
          label={'Nome de Utilizador'}
          error={!!errors.userName}
          helperText={errors.userName?.message}
          control={control}
          defaultValue={user.userName}
          name={'userName'}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextFieldFormValidation
          label={'Email'}
          error={!!errors.email}
          helperText={errors.email?.message}
          control={control}
          defaultValue={user.email}
          name={'email'}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextFieldFormValidation
          label={'Email'}
          error={!!errors.email}
          helperText={errors.email?.message}
          control={control}
          defaultValue={user.email}
          name={'email'}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextFieldFormValidation
          label={'Telemóvel'}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
          control={control}
          defaultValue={user.phoneNumber}
          name={'phoneNumber'}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextFieldFormValidation
          label={'Cargo'}
          error={!!errors.email}
          helperText={errors.email?.message}
          control={control}
          defaultValue={user.email}
          name={'email'}
          required
        />
      </Grid>
    </Grid>
  );
}
