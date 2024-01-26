import { yupResolver } from '@hookform/resolvers/yup';
import {
  UseFormRegister,
  UseFormHandleSubmit,
  UseFormReset,
  useForm,
  FieldErrors,
  Control
} from 'react-hook-form';
import * as Yup from 'yup';
import { IModel } from '../models/Model';
import { IMark } from '../../marks/models/Mark';

const ModelValidationSchema: Yup.ObjectSchema<IModel> = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório!'),
  markId: Yup.number().default(0).required('A marca é obrigatória!'),
  mark: Yup.object<IMark | undefined>()
    .shape({ name: Yup.string().default(''), id: Yup.number().default(0) })
    .default(undefined),
  id: Yup.number().default(0)
});

export default function ModelValidationService(): [
  UseFormRegister<IModel>,
  UseFormHandleSubmit<IModel, undefined>,
  UseFormReset<IModel>,
  FieldErrors<IModel>,
  boolean,
  Control<IModel, any>
] {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
    control
  } = useForm<IModel>({
    resolver: yupResolver(ModelValidationSchema)
  });

  return [register, handleSubmit, reset, errors, isSubmitSuccessful, control];
}
