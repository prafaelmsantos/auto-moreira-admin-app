import { yupResolver } from '@hookform/resolvers/yup';
import {
  UseFormHandleSubmit,
  UseFormReset,
  useForm,
  FieldErrors,
  Control
} from 'react-hook-form';
import { IMark } from '../models/Mark';
import * as Yup from 'yup';

export default function MarkValidationService(
  mark: IMark
): [
  UseFormHandleSubmit<IMark>,
  FieldErrors<IMark>,
  boolean,
  Control<IMark, any>
] {
  const MarkValidationSchema: Yup.ObjectSchema<IMark> = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório!').default(mark.name),
    id: Yup.number().default(mark.id)
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful }
  } = useForm<IMark>({
    resolver: yupResolver(MarkValidationSchema)
  });

  return [handleSubmit, errors, isSubmitSuccessful, control];
}
