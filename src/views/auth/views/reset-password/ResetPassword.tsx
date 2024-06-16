import { useAppDispatch } from '../../../../redux/hooks';
import {
  IResetPasswordValidationSchema,
  resetPasswordValidationSchema
} from '../../services/ResetPasswordValidationSchema';
import { FormProvider, useForm } from 'react-hook-form';
import { IResetPasswordMode } from '../../models/Auth';
import { useState } from 'react';
import ResetPasswordDetails from './details/ResetPasswordDetails';
import { setLoader, setToInitialLoader } from '../../../../redux/loaderSlice';
import { resetPassword } from '../../services/AuthService';
import { MessageType } from '../../../../models/enums/MessageTypeEnum';
import { setModal } from '../../../../redux/modalSlice';
import { zodResolver } from '@hookform/resolvers/zod';

export default function ResetPassword() {
  const dispatch = useAppDispatch();

  const [mode, setMode] = useState<IResetPasswordMode>(
    IResetPasswordMode.START
  );

  const methods = useForm<IResetPasswordValidationSchema>({
    resolver: async (data, context, options) =>
      await zodResolver(resetPasswordValidationSchema)(data, context, options),
    mode: 'all',
    reValidateMode: 'onChange',
    shouldFocusError: true
  });

  const { handleSubmit } = methods;

  const onSubmit = async (user: { email: string }) => {
    dispatch(setLoader(true));
    await resetPassword(user.email)
      .then(() => {
        dispatch(setToInitialLoader());
        setMode(IResetPasswordMode.END);
      })
      .catch((e: Error) => {
        console.error(e);
        dispatch(setToInitialLoader());
        dispatch(
          setModal({
            title: 'Erro a tentar recuperar a palavra-passe',
            message:
              'Lamentamos mas o email inserido é inválido. Por favor verifique o email ou tente mais tarde.',
            type: MessageType.ERROR,
            open: true
          })
        );
      });
  };

  return (
    <FormProvider {...methods}>
      <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
        <ResetPasswordDetails
          {...{ mode, setMode }}
          handleSubmit={handleSubmit(onSubmit)}
        />
      </div>
    </FormProvider>
  );
}
