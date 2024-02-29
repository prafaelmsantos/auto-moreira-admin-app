import * as Yup from 'yup';

export const ResetPasswordValidationSchema: Yup.ObjectSchema<{email: string}> = Yup.object().shape(
  {
    email: Yup.string().trim().required('O nome é obrigatório!'),
  }
);

export type IResetPasswordValidationSchema = Yup.InferType<typeof ResetPasswordValidationSchema>;