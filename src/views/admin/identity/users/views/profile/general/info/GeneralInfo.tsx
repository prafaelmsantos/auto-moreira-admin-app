import { FormProvider, useForm } from 'react-hook-form';
import { IUser } from '../../../../models/User';
import { useEffect } from 'react';
import { IMode } from '../../../../../../../../models/enums/Base';
import {
  IUserValidationSchema,
  userValidationSchema
} from '../../../../services/UserValidationSchema';
import Card from '../../../../../../../../components/card';
import ProfilePageHolder from '../../../../../../../../components/base/ProfilePageHolder';
import GetActions from '../../../../../../../../components/base/Actions';
import TextFieldCard from '../../../components/card/AutoMoreiraTextFieldCard';
import { useAppDispatch } from '../../../../../../../../redux/hooks';
import {
  setLoader,
  setToInitialLoader
} from '../../../../../../../../redux/loaderSlice';
import { updateUser } from '../../../../services/UserService';
import { setSnackBar } from '../../../../../../../../redux/snackBarSlice';
import { MessageType } from '../../../../../../../../models/enums/MessageTypeEnum';
import { setModal } from '../../../../../../../../redux/modalSlice';
import { zodResolver } from '@hookform/resolvers/zod';

interface IGeneralInfo {
  user: IUser;
  modeInfo: IMode;
  setModeInfo: React.Dispatch<React.SetStateAction<IMode>>;
}
const GeneralInfo = ({
  user,
  modeInfo: mode,
  setModeInfo: setMode
}: IGeneralInfo) => {
  const dispatch = useAppDispatch();

  const methods = useForm<IUserValidationSchema>({
    resolver: async (data, context, options) =>
      await zodResolver(userValidationSchema)(data, context, options),
    mode: 'all',
    reValidateMode: 'onChange',
    shouldFocusError: true
  });

  const {
    reset,
    handleSubmit,
    formState: { errors }
  } = methods;

  useEffect(() => {
    void reset(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleEdit = () => setMode(IMode.EDIT);

  const handleSumbitEdit = async (user: IUser) => {
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

  const handleClose = () => setMode(IMode.PREVIEW);

  return (
    <FormProvider {...methods}>
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
          <TextFieldCard
            disabled={mode === IMode.PREVIEW}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            name={'firstName'}
            required
            label={'Primeiro Nome'}
            value={user.firstName}
          />
          <TextFieldCard
            disabled={mode === IMode.PREVIEW}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            name={'lastName'}
            required
            label={'Ultimo Nome'}
            value={user.lastName}
            {...{ errors }}
          />
          <TextFieldCard
            disabled={mode === IMode.PREVIEW}
            error={!!errors.email}
            helperText={errors.email?.message}
            name={'email'}
            label={'Email'}
            value={user.email ?? ''}
            required
            {...{ errors }}
          />
          <TextFieldCard
            disabled={mode === IMode.PREVIEW}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
            name={'phoneNumber'}
            label={'Contacto'}
            value={user.phoneNumber}
            required
            {...{ errors }}
          />
        </div>
      </Card>
    </FormProvider>
  );
};

export default GeneralInfo;
