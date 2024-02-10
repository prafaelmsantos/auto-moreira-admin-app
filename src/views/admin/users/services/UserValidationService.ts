import { yupResolver } from '@hookform/resolvers/yup';
import {
  UseFormHandleSubmit,
  useForm,
  FieldErrors,
  Control,
  UseFormReset
} from 'react-hook-form';
import * as Yup from 'yup';

import { IUserUpdate } from '../models/User';

export default function UserValidationService(
  user: IUserUpdate
): [
  UseFormHandleSubmit<IUserUpdate>,
  FieldErrors<IUserUpdate>,
  Control<IUserUpdate>,
  UseFormReset<IUserUpdate>
] {
  const UserValidationSchema: Yup.ObjectSchema<IUserUpdate> =
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
      role: Yup.string().trim().nullable().default(user.role),
      imageUrl: Yup.string().trim().nullable().default(user.imageUrl),
      password: Yup.string().trim().nullable().default(user.password),
      token: Yup.string().trim().nullable().default(user.token),
      id: Yup.number().default(user.id)
    });

  const {
    handleSubmit,
    reset,
    formState: { errors },
    control
  } = useForm<IUserUpdate>({
    resolver: yupResolver(UserValidationSchema)
  });

  return [handleSubmit, errors, control, reset];
}
