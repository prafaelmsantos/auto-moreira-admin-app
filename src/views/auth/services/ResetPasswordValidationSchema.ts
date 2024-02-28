import * as Yup from 'yup';

export const ResetPasswordValidationSchema: Yup.ObjectSchema<{userName: string}> = Yup.object().shape(
  {
    userName: Yup.string().trim().required('O nome é obrigatório!'),
  }
);

export type IResetPasswordValidationSchema = Yup.InferType<typeof ResetPasswordValidationSchema>;