import { yupResolver } from '@hookform/resolvers/yup';
import {
  UseFormRegister,
  UseFormHandleSubmit,
  UseFormReset,
  useForm,
  FieldErrors
} from 'react-hook-form';
import { IMark } from '../../models/Mark';
import * as Yup from 'yup';

const MarkValidationSchema: Yup.ObjectSchema<IMark> = Yup.object().shape({
  name: Yup.string().required('O nome completo é obrigatório!'),
  id: Yup.number().default(0)
});

export default function MarkValidationService(): [
  UseFormRegister<IMark>,
  UseFormHandleSubmit<IMark, undefined>,
  UseFormReset<IMark>,
  FieldErrors<IMark>,
  boolean
] {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm<IMark>({
    resolver: yupResolver(MarkValidationSchema)
  });

  return [register, handleSubmit, reset, errors, isSubmitSuccessful];
}
