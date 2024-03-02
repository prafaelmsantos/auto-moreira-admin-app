
import * as Yup from 'yup';
import { IUserUpdatePassword } from '../models/User';

export const UserPasswordValidationSchema: Yup.ObjectSchema<IUserUpdatePassword> =
    Yup.object().shape({    
      email: Yup.string().trim().required('O email é obrigatório!').default(''),   
      password: Yup.string().trim()
      .required('A palavra-passe é obrigatória!')
      .min(6, 'A palavra-passe deve conter pelo menos 6 caracteres!')
      .default(''),
      confirmPassword: Yup.string().trim().label('confirm password')
      .required('A nova palavra-passe é obrigatória!')
      .oneOf([Yup.ref('password')], 'As palavras-passe não são iguais!')
      .min(6, 'A palavra-passe deve conter pelo menos 6 caracteres!')
      .default(''),
    });

    export type IUserPasswordValidationSchema = Yup.InferType<typeof UserPasswordValidationSchema>;