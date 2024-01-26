import { TextField } from '@mui/material';
import InputField from '../../components/fields/InputField';
import SignInValidationService from './services/SignInValidationService';
import { IUser, IUserLogin } from './models/User';
import { MessageType } from '../../models/enums/MessageTypeEnum';
import { setModal } from '../../redux/modalSlice';
import { setSnackBar } from '../../redux/snackBarSlice';
import UserService from '../../services/UserService';
import AuthService from './services/AuthService';
import { useAppDispatch } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [register, handleSubmit, reset, errors, isSubmitSuccessful] =
    SignInValidationService();

  console.log(errors);

  const onSubmit = async (user: IUserLogin) => {
    const response = await AuthService.Login(user);
    if (response) {
      if (response.ok) {
        const responseUser = (await response
          .json()
          .then((response) => response)) as IUser;

        UserService.setCurrentUser(responseUser, dispatch, navigate);
        window.scrollTo(0, 0);
        return Promise.resolve();
      } else {
        dispatch(
          setModal({
            title: 'Erro ao tentar efetuar login ao sistema',
            message:
              'Lamentamos mas os dados inseridos não estão corretos. Por favor, verifique o email ou a password.',
            type: MessageType.ERROR,
            open: true
          })
        );
      }
    }
  };

  return (
    <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Entrar
        </h4>
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
          <a
            className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            href=" "
          >
            Esqueceu-se da palavra-passe?
          </a>
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
