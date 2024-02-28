import InputField from '../../../components/fields/InputField';
import { IUserLogin } from '../models/Auth';
import { MessageType } from '../../../models/enums/MessageTypeEnum';
import { setModal } from '../../../redux/modalSlice';
import { useAppDispatch } from '../../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { login, setCurrentUser } from '../services/AuthService';
import { setSnackBar } from '../../../redux/snackBarSlice';
import { setLoader, setToInitialLoader } from '../../../redux/loaderSlice';
import { mainNavigate } from './utils/Utils';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignInValidationSchema } from '../services/SignInValidationSchema';

export default function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const methods = useForm<IUserLogin>({
    resolver: yupResolver(SignInValidationSchema)
  });
  const {
    reset,
    handleSubmit,
    register,
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
            message: `Bem-vindo ${user.userName}`,
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
            title: 'Erro ao tentar efetuar login ao sistema',
            message:
              'Lamentamos mas os dados inseridos não estão corretos. Por favor, verifique o email ou a password.',
            type: MessageType.ERROR,
            open: true
          })
        );
      });
  };

  return (
    <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <FormProvider {...methods}>
        <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
          <h4 className="mb-2.5 text-4xl font-bold text-white">Entrar</h4>
          <p className="mb-9 ml-1 text-base text-gray-600">
            Insira o seu nome de utilizador e a sua palavra-passe
          </p>

          {/* Email */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Nome de Utilizador*"
            placeholder="cr7master"
            id="username"
            type="text"
            register={register('userName')}
            error={!!errors.userName}
            helperText={errors.userName?.message}
          />

          {/* Password */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Palavra-passe*"
            placeholder="Min. 6 caracteres"
            id="password"
            type="password"
            register={register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          {/* Checkbox */}
          <div className="mb-4 mt-1 flex items-center justify-end px-2">
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
