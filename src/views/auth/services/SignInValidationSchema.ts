import * as Yup from 'yup';
import { IUserLogin } from '../models/Auth';

export const SignInValidationSchema: Yup.ObjectSchema<IUserLogin> =
  Yup.object().shape({
    email: Yup.string().trim().required('O nome de utilizador é obrigatório!'),
    password: Yup.string().trim()
      .required('A palavra-passe é obrigatória!')
      .min(6, 'A palavra-passe deve conter pelo menos 6 caracteres!')
  });
export type ISignInValidationSchema = Yup.InferType<typeof SignInValidationSchema>;
