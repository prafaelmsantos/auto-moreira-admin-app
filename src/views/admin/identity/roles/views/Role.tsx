import { useEffect, useState } from 'react';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../../redux/hooks';
import { IRole } from '../models/Role';
import { addRoleNavigate, roleListNavigate } from './components/utils/Utils';
import {
  setLoader,
  setToInitialLoader
} from '../../../../../redux/loaderSlice';
import { createRole, getRole, updateRole } from '../services/RoleService';
import { IMode } from '../../../../../models/enums/Base';
import { setSnackBar } from '../../../../../redux/snackBarSlice';
import { MessageType } from '../../../../../models/enums/MessageTypeEnum';
import { setModal } from '../../../../../redux/modalSlice';
import PageHolder from '../../../../../components/base/PageHolder';
import GetActions from '../../../../../components/base/Actions';
import RoleDetails from './details/RoleDetails';
import { FormProvider, useForm } from 'react-hook-form';
import {
  IRoleValidationSchema,
  roleValidationSchema
} from '../services/RoleValidationSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Role() {
  const methods = useForm<IRoleValidationSchema>({
    resolver: async (data, context, options) =>
      await zodResolver(roleValidationSchema)(data, context, options),
    mode: 'all',
    reValidateMode: 'onChange',
    shouldFocusError: true
  });

  const { reset, handleSubmit } = methods;
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [role, setRole] = useState<IRole>({
    id: 0,
    name: '',
    isDefault: false,
    isReadOnly: false
  });
  const roleId = Number(param.id);
  const match = useMatch(addRoleNavigate);
  const [mode, setMode] = useState<IMode>();

  useEffect(() => {
    if (roleId) {
      dispatch(setLoader(true));
      getRole(roleId)
        .then((data) => {
          setRole(data);
          dispatch(setToInitialLoader());
          setMode(IMode.EDIT);
        })
        .catch((e) => {
          console.error(e);
          navigate(roleListNavigate);
          dispatch(setToInitialLoader());
        });
    } else if (match) {
      setMode(IMode.ADD);
    } else {
      navigate(roleListNavigate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleId]);

  useEffect(() => {
    void reset(role);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  const handleClose = () => navigate(roleListNavigate);

  const handleSumbitEdit = async (role: IRole) => {
    dispatch(setLoader(true));
    updateRole(role)
      .then(() => {
        dispatch(setToInitialLoader());
        dispatch(
          setSnackBar({
            open: true,
            message: 'Cargo atualizado com sucesso!',
            type: MessageType.SUCCESS
          })
        );
        navigate(roleListNavigate);
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

  const handleSumbitAdd = async (role: IRole) => {
    dispatch(setLoader(true));
    createRole(role)
      .then(() => {
        dispatch(setToInitialLoader());
        dispatch(
          setSnackBar({
            open: true,
            message: 'Cargo criado com sucesso!',
            type: MessageType.SUCCESS
          })
        );
        navigate(roleListNavigate);
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
      <FormProvider {...methods}>
        {mode && (
          <>
            <PageHolder
              actions={GetActions({
                ...{ mode, handleClose },
                handleSubmitEdit: handleSubmit(handleSumbitEdit),
                handleSumbitAdd: handleSubmit(handleSumbitAdd)
              })}
            />
            <RoleDetails />
          </>
        )}
      </FormProvider>
    </>
  );
}
