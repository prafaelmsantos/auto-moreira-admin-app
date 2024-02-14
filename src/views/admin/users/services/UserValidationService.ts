import { yupResolver } from '@hookform/resolvers/yup';
import {
  UseFormHandleSubmit,
  useForm,
  FieldErrors,
  Control,
  UseFormReset
} from 'react-hook-form';
import * as Yup from 'yup';

import { IUser } from '../models/User';

export default function UserValidationService(
  user: IUser
): [
  UseFormHandleSubmit<IUser>,
  FieldErrors<IUser>,
  Control<IUser>,
  UseFormReset<IUser>
] {
  const UserValidationSchema: Yup.ObjectSchema<IUser> =
    Yup.object().shape({
      userName: Yup.string().default(user.userName),
      firstName: Yup.string()
        .trim()
        .required('O primeiro nome é obrigatório!')
        .default(user.firstName),
      lastName: Yup.string()
        .trim()
        .required('O ultimo nome é obrigatório!')
        .default(user.lastName),
      email: Yup.string().trim().nullable().default(user.email),
      phoneNumber: Yup.string().trim().nullable().default(user.phoneNumber),
      imageUrl: Yup.string().trim().nullable().default(user.imageUrl),
      password: Yup.string().trim().nullable().default(user.password),
      token: Yup.string().trim().nullable().default(user.token),
      id: Yup.number().default(user.id),
      //roles: Yup.array().default([]),
       roles: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().default(''),
          id: Yup.number().default(0),
        })
      )
      .default([]), 
    });

  const {
    handleSubmit,
    reset,
    formState: { errors },
    control
  } = useForm<IUser>({
    resolver: yupResolver(UserValidationSchema)
  });

  return [handleSubmit, errors, control, reset];
}
