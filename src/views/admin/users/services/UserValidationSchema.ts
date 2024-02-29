
import * as Yup from 'yup';
import { IUser } from '../models/User';

export const UserValidationSchema: Yup.ObjectSchema<IUser> =
    Yup.object().shape({
      darkMode: Yup.boolean(),
      firstName: Yup.string()
        .trim()
        .required('O primeiro nome é obrigatório!')
        .default(''),
      lastName: Yup.string()
        .trim()
        .required('O ultimo nome é obrigatório!')
        .default(''),
      email: Yup.string().trim().default(''),
      phoneNumber: Yup.string().trim().nullable().default(null),
      image: Yup.string().trim().nullable().default(null),
      password: Yup.string().trim().nullable().default(null),
      token: Yup.string().trim().nullable().default(null),
      id: Yup.number().default(0),
       roles: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().default(''),
          id: Yup.number().default(0),
        })
      )
      .default([]), 
    });

    export type IUserValidationSchema = Yup.InferType<typeof UserValidationSchema>;