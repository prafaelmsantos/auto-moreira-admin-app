import { yupResolver } from '@hookform/resolvers/yup';
import {
  UseFormRegister,
  UseFormHandleSubmit,
  useForm,
  FieldErrors
} from 'react-hook-form';

import * as Yup from 'yup';
import { IUserLogin } from '../models/Auth';

const UserLoginValidationSchema: Yup.ObjectSchema<IUserLogin> =
  Yup.object().shape({
    userName: Yup.string().required('O nome de utilizador é obrigatório!'),
    password: Yup.string()
      .required('A palavra-passe é obrigatória!')
      .min(6, 'A palavra-passe deve conter pelo menos 6 digitos!')
  });

export default function SignInValidationService(): [
  UseFormRegister<IUserLogin>,
  UseFormHandleSubmit<IUserLogin>,
  FieldErrors<IUserLogin>
] {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUserLogin>({
    resolver: yupResolver(UserLoginValidationSchema)
  });

  return [register, handleSubmit, errors];
}
