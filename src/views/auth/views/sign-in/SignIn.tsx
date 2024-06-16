import { IUserLogin } from '../../models/Auth';
import { MessageType } from '../../../../models/enums/MessageTypeEnum';
import { setModal } from '../../../../redux/modalSlice';
import { useAppDispatch } from '../../../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { login, setCurrentUser } from '../../services/AuthService';
import { setSnackBar } from '../../../../redux/snackBarSlice';
import { setLoader, setToInitialLoader } from '../../../../redux/loaderSlice';
import { mainNavigate } from '../utils/Utils';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ISignInValidationSchema,
  signInValidationSchema
} from '../../services/SignInValidationSchema';
import TextFieldCard from '../../../admin/identity/users/views/components/card/AutoMoreiraTextFieldCard';
import { useState } from 'react';
import { Box } from '@mui/material';

export default function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const methods = useForm<ISignInValidationSchema>({
    resolver: async (data, context, options) =>
      await zodResolver(signInValidationSchema)(data, context, options),
    mode: 'all',
    reValidateMode: 'onChange',
    shouldFocusError: true
  });

  const {
    handleSubmit,
    formState: { errors }
  } = methods;

  const onSubmit = async (user: IUserLogin) => {
    dispatch(setLoader(true));
    await login(user)
      .then((response) => {
        setCurrentUser(response, dispatch);
        dispatch(setToInitialLoader());
        dispatch(
          setSnackBar({
            open: true,
            message: `Bem-vindo ${user.email}`,
            type: MessageType.SUCCESS
          })
        );
        navigate(mainNavigate);
      })
      .catch((e: Error) => {
        console.error(e);
        dispatch(setToInitialLoader());
        dispatch(
          setModal({
            title: 'Erro ao tentar entrar no sistema',
            message:
              'Lamentamos mas os dados inseridos não estão corretos. Por favor verifique o email ou a password ou tente mais tarde.',
            type: MessageType.ERROR,
            open: true
          })
        );
      });
  };
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleShowPassword = () => setShowPassword((show) => !show);

  return (
    <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <FormProvider {...methods}>
        <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
          <h4 className="mb-2.5 text-4xl font-bold text-white">Entrar</h4>
          <p className="mb-9 ml-1 text-base text-gray-600">
            Insira o seu email e a sua palavra-passe
          </p>

          {/* Email */}
          <TextFieldCard
            error={!!errors.email}
            helperText={errors.email?.message}
            name={'email'}
            required
            label={'Email'}
            value={''}
          />

          {/* Password */}
          <Box sx={{ mt: 2 }}>
            <TextFieldCard
              error={!!errors.password}
              helperText={errors.password?.message}
              name={'password'}
              required
              label={'Palavra-passe'}
              value={''}
              endAdornment
              showPassword={showPassword}
              handleClickShowPassword={handleShowPassword}
            />
          </Box>

          {/* Reset Password */}
          <div className="mb-4 mt-3 flex items-center justify-end px-2">
            <button
              className="text-sm font-medium text-white hover:text-brand-600"
              onClick={() => navigate('/auth/reset-password')}
            >
              Esqueceu-se da palavra-passe?
            </button>
          </div>
          <button
            onClick={handleSubmit(onSubmit)}
            className="linear mt-2 w-full rounded-xl bg-brand-400 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-300 active:bg-brand-200"
          >
            Entrar
          </button>
        </div>
      </FormProvider>
    </div>
  );
}
