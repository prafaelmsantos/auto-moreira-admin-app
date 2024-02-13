import { yupResolver } from '@hookform/resolvers/yup';
import {
  UseFormHandleSubmit,
  useForm,
  FieldErrors,
  Control
} from 'react-hook-form';
import * as Yup from 'yup';
import { IRole } from '../models/Role';

export default function RoleValidationService(
  role: IRole
): [UseFormHandleSubmit<IRole>, FieldErrors<IRole>, Control<IRole, any>] {
  const MarkValidationSchema: Yup.ObjectSchema<IRole> = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório!').default(role.name),
    id: Yup.number().default(role.id)
  });

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IRole>({
    resolver: yupResolver(MarkValidationSchema)
  });

  return [handleSubmit, errors, control];
}
