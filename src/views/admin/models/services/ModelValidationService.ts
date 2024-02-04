import { yupResolver } from '@hookform/resolvers/yup';
import {
  UseFormHandleSubmit,
  UseFormReset,
  useForm,
  FieldErrors,
  Control
} from 'react-hook-form';
import * as Yup from 'yup';
import { IModel } from '../models/Model';
import { IMark } from '../../marks/models/Mark';

export default function ModelValidationService(
  model: IModel
): [
  UseFormHandleSubmit<IModel>,
  UseFormReset<IModel>,
  FieldErrors<IModel>,
  boolean,
  Control<IModel>
] {
  const ModelValidationSchema: Yup.ObjectSchema<IModel> = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório!').default(model.name),
    markId: Yup.number()
      .required('A marca é obrigatória!')
      .test(
        'A marca é obrigatória!',
        'A marca é obrigatória!',
        (value) => value > 0
      )
      .default(model.markId),
    mark: Yup.object<IMark | undefined>()
      .shape({ name: Yup.string().default(''), id: Yup.number().default(0) })
      .default(undefined),
    id: Yup.number().default(0)
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
    control
  } = useForm<IModel>({
    resolver: yupResolver(ModelValidationSchema)
  });

  return [handleSubmit, reset, errors, isSubmitSuccessful, control];
}
