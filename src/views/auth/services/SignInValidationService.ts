import { yupResolver } from '@hookform/resolvers/yup';
import {
  UseFormRegister,
  UseFormHandleSubmit,
  UseFormReset,
  useForm,
  FieldErrors
} from 'react-hook-form';

import * as Yup from 'yup';
import { IUserLogin } from '../models/User';

const UserLoginValidationSchema: Yup.ObjectSchema<IUserLogin> =
  Yup.object().shape({
    userName: Yup.string().required('O nome de utilizador é obrigatório!'),
    password: Yup.string()
      .required('A palavra-passe é obrigatória!')
      .min(6, 'A palavra-passe deve conter pelo menos 6 digitos!')
  });

export default function SignInValidationService(): [
  UseFormRegister<IUserLogin>,
  UseFormHandleSubmit<IUserLogin, undefined>,
  UseFormReset<IUserLogin>,
  FieldErrors<IUserLogin>,
  boolean
] {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm<IUserLogin>({
    resolver: yupResolver(UserLoginValidationSchema)
  });

  return [register, handleSubmit, reset, errors, isSubmitSuccessful];
}
