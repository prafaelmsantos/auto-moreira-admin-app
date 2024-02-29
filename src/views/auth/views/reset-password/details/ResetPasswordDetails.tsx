import { useNavigate } from 'react-router-dom';

import { useFormContext } from 'react-hook-form';
import InputField from '../../../../../components/fields/InputField';
import { IResetPasswordMode } from '../../../models/Auth';
import { IResetPasswordValidationSchema } from '../../../services/ResetPasswordValidationSchema';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

interface IResetPasswordDetails {
  mode: IResetPasswordMode;
  handleSubmit: () => void;
  setMode: React.Dispatch<React.SetStateAction<IResetPasswordMode>>;
}
export default function ResetPasswordDetails({
  mode,
  handleSubmit,
  setMode
}: IResetPasswordDetails) {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors }
  } = useFormContext<IResetPasswordValidationSchema>();

  return (
    <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {mode === IResetPasswordMode.START ? (
        <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
          <h4 className="mb-2.5 text-4xl font-bold text-white">
            Recuperar Palavra-passe
          </h4>
          <p className="mb-9 ml-1 text-base text-gray-600">
            Insira o seu email e enviaremos uma nova palavra-passe para o email
            registado.
          </p>

          {/* Email */}

          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="cr7master"
            id="email"
            type="text"
            register={register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <button
            onClick={handleSubmit}
            className="linear mt-2 w-full rounded-xl bg-brand-400 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-300 active:bg-brand-200"
          >
            Enviar
          </button>
          <div className="mb-4 mt-2 flex items-center justify-end px-2">
            <button
              onClick={() => navigate('/auth/sign-in')}
              className="text-sm font-medium text-white hover:text-brand-600"
            >
              Ja sou registado!
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
          <h4 className="mb-2.5  text-4xl font-bold text-white">
            <CheckCircleOutlineOutlinedIcon
              sx={{
                fontSize: 50
              }}
            />
            {' Email enviado!'}
          </h4>
          <p className="mb-9 ml-1 text-base text-gray-600">
            Uma nova palavra-passe foi enviada para o email indicado.
          </p>

          <button
            onClick={() => setMode(IResetPasswordMode.START)}
            className="linear mt-2 w-full rounded-xl bg-brand-400 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-300 active:bg-brand-200"
          >
            Fechar
          </button>
        </div>
      )}
    </div>
  );
}
