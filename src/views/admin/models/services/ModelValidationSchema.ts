import * as Yup from 'yup';
import { IModel } from '../models/Model';
import { IMark } from '../../marks/models/Mark';


export const ModelValidationSchema: Yup.ObjectSchema<IModel> = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório!').default(''),
    markId: Yup.number()
      .required('A marca é obrigatória!')
      .test(
        'A marca é obrigatória!',
        'A marca é obrigatória!',
        (value) => value > 0
      )
      .default(0),
    mark: Yup.object<IMark | undefined>()
      .shape({ name: Yup.string().default(''), id: Yup.number().default(0) })
      .default(undefined),
    id: Yup.number().default(0)
  });

export type IModelValidationSchema = Yup.InferType<typeof ModelValidationSchema>;
