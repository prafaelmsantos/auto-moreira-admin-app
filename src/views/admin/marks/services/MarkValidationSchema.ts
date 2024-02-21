import { IMark } from '../models/Mark';
import * as Yup from 'yup';

export const MarkValidationSchema: Yup.ObjectSchema<IMark> = Yup.object().shape(
  {
    name: Yup.string().required('O nome é obrigatório!').default(''),
    id: Yup.number().default(0)
  }
);

export type IMarkValidationSchema = Yup.InferType<typeof MarkValidationSchema>;