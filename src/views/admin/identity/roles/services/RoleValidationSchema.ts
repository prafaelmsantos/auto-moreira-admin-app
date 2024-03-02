import * as Yup from 'yup';
import { IRole } from '../models/Role';

export const RoleValidationSchema: Yup.ObjectSchema<IRole> = Yup.object().shape(
  {
    name: Yup.string().required('O nome é obrigatório!').default(''),
    isDefault: Yup.boolean().default(false),
    id: Yup.number().default(0)
  }
);

export type IRoleValidationSchema = Yup.InferType<typeof RoleValidationSchema>;