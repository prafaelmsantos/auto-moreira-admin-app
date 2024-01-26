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

const MarkValidationSchema: Yup.ObjectSchema<IMark> = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório!'),
  id: Yup.number().default(0)
});

export default function MarkValidationService(): [
  UseFormHandleSubmit<IMark>,
  UseFormReset<IMark>,
  FieldErrors<IMark>,
  boolean,
  Control<IMark, any>
] {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitSuccessful }
  } = useForm<IMark>({
    resolver: yupResolver(MarkValidationSchema)
  });

  return [handleSubmit, reset, errors, isSubmitSuccessful, control];
}
