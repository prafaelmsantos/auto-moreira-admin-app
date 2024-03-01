import Card from '../../../../../../../components/card';
import { IUser, IUserUpdatePassword } from '../../../../models/User';
import GeneralCard from '../../../components/card/GeneralCard';
import { useEffect, useState } from 'react';
import ProfilePageHolder from '../../../../../../../components/base/ProfilePageHolder';
import GetActions from '../../../../../../../components/base/Actions';
import { IMode } from '../../../../../../../models/enums/Base';
import { useAppDispatch } from '../../../../../../../redux/hooks';
import {
  setLoader,
  setToInitialLoader
} from '../../../../../../../redux/loaderSlice';
import { setSnackBar } from '../../../../../../../redux/snackBarSlice';
import { MessageType } from '../../../../../../../models/enums/MessageTypeEnum';
import { updateUserPassword } from '../../../../services/UserService';
import { setModal } from '../../../../../../../redux/modalSlice';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { UserPasswordValidationSchema } from '../../../../services/UserPasswordValidationSchema';

interface IGeneralPassword {
  user: IUser;
}

const GeneralPassword = ({ user }: IGeneralPassword) => {
  const ShowPasswordInitialState = {
    first: false,
    second: false
  };
  const [mode, setMode] = useState<IMode>(IMode.PREVIEW);
  const [showPassword, setShowPassword] = useState(ShowPasswordInitialState);

  const dispatch = useAppDispatch();
  const methods = useForm<IUserUpdatePassword>({
    resolver: yupResolver(UserPasswordValidationSchema)
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
    control
  } = methods;

  useEffect(() => {
    user &&
      void reset({
        email: user.email ?? '',
        confirmPassword: '',
        password: ''
      });
    setShowPassword(ShowPasswordInitialState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, mode]);

  const handleShowPasswordFirst = () =>
    setShowPassword((show) => ({ ...show, first: !show.first }));

  const handleShowPasswordSecond = () =>
    setShowPassword((show) => ({ ...show, second: !show.second }));

  const handleEdit = () => setMode(IMode.EDIT);
  const handleClose = () => {
    setMode(IMode.PREVIEW);
    void reset();
  };

  const handleSumbitEdit = async (user: IUserUpdatePassword) => {
    dispatch(setLoader(true));
    updateUserPassword(user)
      .then(() => {
        dispatch(setToInitialLoader());
        dispatch(
          setSnackBar({
            open: true,
            message: 'Palavra-passe atualizada com sucesso!',
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
    <FormProvider {...methods}>
      <Card extra={'w-full h-full p-3 mt-4'}>
        {/* Header */}
        <div className="mb-8 mt-2 w-full">
          <div className="grid grid-cols-2">
            <div>
              <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
                Palavra-passe
              </h4>
              <p className="mt-2 px-2 text-base text-gray-600">
                Pode alterar aqui a palavra-chave que utiliza para aceder ao
                sistema. Utilize no mínimo 6 caracteres.
              </p>
            </div>

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

        {mode === IMode.EDIT && (
          <div className="xs:grid-cols-1 grid gap-4 px-2 md:grid-cols-2">
            <GeneralCard
              error={!!errors.password}
              helperText={errors.password?.message}
              name={'password'}
              required
              label={'Nova Palavra-passe'}
              value={''}
              endAdornment
              showPassword={showPassword.first}
              handleClickShowPassword={handleShowPasswordFirst}
              {...{ control }}
            />
            <GeneralCard
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              name={'confirmPassword'}
              required
              label={'Confirmar Palavra-passe'}
              value={''}
              endAdornment
              showPassword={showPassword.second}
              handleClickShowPassword={handleShowPasswordSecond}
              {...{ control }}
            />
          </div>
        )}
      </Card>
    </FormProvider>
  );
};

export default GeneralPassword;
