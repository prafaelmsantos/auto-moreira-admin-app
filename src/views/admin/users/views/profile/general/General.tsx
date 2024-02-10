import Card from '../../../../../../components/card';
import { IUserUpdate } from '../../../models/User';
import GeneralCard from '../../components/card/GeneralCard';
import { useState } from 'react';
import ProfilePageHolder from '../../../../../../components/base/ProfilePageHolder';
import GetActions from '../../../../../../components/base/Actions';
import { IMode } from '../../../../../../models/enums/Base';
import { useAppDispatch } from '../../../../../../redux/hooks';
import {
  setLoader,
  setToInitialLoader
} from '../../../../../../redux/loaderSlice';
import { setSnackBar } from '../../../../../../redux/snackBarSlice';
import { MessageType } from '../../../../../../models/enums/MessageTypeEnum';
import { updateUser } from '../../../services/UserService';
import { setModal } from '../../../../../../redux/modalSlice';
import UserValidationService from '../../../services/UserValidationService';
import { removeEmptyFields } from '../../../../../../utils/Helppers';

interface IGeneral {
  user: IUserUpdate;
  mode: IMode;
  setMode: React.Dispatch<React.SetStateAction<IMode>>;
}

const General = ({ user, mode, setMode }: IGeneral) => {
  const dispatch = useAppDispatch();
  const [handleSubmit, errors, control, reset] = UserValidationService(user);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleEdit = () => setMode(IMode.EDIT);
  const handleClose = () => {
    setMode(IMode.PREVIEW);
    void reset();
  };

  const handleSumbitEdit = async (user: IUserUpdate) => {
    void removeEmptyFields(user);
    dispatch(setLoader(true));
    updateUser(user)
      .then(() => {
        dispatch(setToInitialLoader());
        dispatch(
          setSnackBar({
            open: true,
            message: 'Perfil atualizado com sucesso!',
            type: MessageType.SUCCESS
          })
        );
        setMode(IMode.PREVIEW);
      })
      .catch((e: Error) => {
        console.error(e);
        dispatch(setToInitialLoader());
        dispatch(
          setModal({
            title: 'Erro Interno do Servidor',
            message: e.toString(),
            type: MessageType.ERROR,
            open: true
          })
        );
      });
  };

  return (
    <>
      <Card extra={'w-full h-full p-3'}>
        {/* Header */}
        <div className="mb-8 mt-2 w-full">
          <div className="grid grid-cols-2">
            <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
              Informação Geral
            </h4>
            <div className="flex justify-end">
              <ProfilePageHolder
                actions={GetActions({
                  ...{ mode, handleClose, handleEdit },
                  handleSubmitEdit: handleSubmit(handleSumbitEdit)
                })}
              />
            </div>
          </div>
        </div>
        {/* Cards */}
        <div className="xs:grid-cols-1 grid gap-4 px-2 md:grid-cols-2">
          <GeneralCard
            disabled={mode === IMode.PREVIEW}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            name={'firstName'}
            required
            label={'Primeiro Nome'}
            value={user.firstName}
            {...{ control }}
          />
          <GeneralCard
            disabled={mode === IMode.PREVIEW}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            name={'lastName'}
            required
            label={'Ultimo Nome'}
            value={user.lastName}
            {...{ errors, control }}
          />
          <GeneralCard
            disabled={mode === IMode.PREVIEW}
            name={'email'}
            label={'Email'}
            value={user.email ?? ''}
            {...{ errors, control }}
          />
          <GeneralCard
            disabled={mode === IMode.PREVIEW}
            name={'phoneNumber'}
            label={'Contacto'}
            value={user.phoneNumber}
            {...{ errors, control }}
          />
        </div>
      </Card>
      <Card extra={'w-full h-full p-3 mt-4'}>
        {/* Header */}
        <div className="mb-8 mt-2 w-full">
          <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
            Palavra-passe
          </h4>
          <p className="mt-2 px-2 text-base text-gray-600">
            Pode alterar aqui a palavra-chave que utiliza para aceder ao
            sistema. Selecione no mínimo 6 caracteres. Não utilize uma
            palavra-chave de outro site ou que seja fácil de adivinhar.
          </p>
        </div>
        {/* Cards */}
        <div className="xs:grid-cols-1 grid gap-4 px-2 md:grid-cols-2">
          {/* <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            defaultValue={'value'}
            disabled
            /* InputProps={{
                disableUnderline: true
              }} 
            variant="standard"
            sx={AutocompleteSX(false)}
          /> */}
          <GeneralCard
            name={'password'}
            label={'Nova Palavra-passe'}
            value={user.password}
            {...{ errors, control }}
          />
          <GeneralCard
            name={'password'}
            label={'Comfirmar Palavra-passe'}
            value={user.password}
            {...{ errors, control }}
          />
        </div>
      </Card>
    </>
  );
};

export default General;
