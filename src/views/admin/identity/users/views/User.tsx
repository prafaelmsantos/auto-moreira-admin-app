import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../../redux/hooks';
import { useEffect, useState } from 'react';
import { IUser } from '../models/User';
import { addUserNavigate, userListNavigate } from './utils/Utils';
import { IMode } from '../../../../../models/enums/Base';
import {
  setLoader,
  setToInitialLoader
} from '../../../../../redux/loaderSlice';
import { createUser, getUser, updateUser } from '../services/UserService';
import { UserValidationSchema } from '../services/UserValidationSchema';
import { setSnackBar } from '../../../../../redux/snackBarSlice';
import { MessageType } from '../../../../../models/enums/MessageTypeEnum';
import { setModal } from '../../../../../redux/modalSlice';
import PageHolder from '../../../../../components/base/PageHolder';
import GetActions from '../../../../../components/base/Actions';
import UserDetails from './details/UserDetails';
import { useQuery } from '@apollo/client';

import { ROLES } from '../../roles/models/graphQL/Roles';
import { convertToRole } from '../../roles/models/Role';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  roles_roles_nodes,
  roles
} from '../../roles/models/graphQL/types/roles';

export default function User() {
  const methods = useForm<IUser>({
    resolver: yupResolver(UserValidationSchema)
  });

  const { reset, handleSubmit } = methods;
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<IUser>({
    firstName: '',
    lastName: '',
    token: null,
    password: null,
    image: null,
    email: '',
    phoneNumber: '',
    roles: [],
    id: 0
  });
  const userId = Number(param.id);
  const match = useMatch(addUserNavigate);
  const [mode, setMode] = useState<IMode>();

  const { data } = useQuery<roles>(ROLES);
  const roles =
    data?.roles?.nodes?.map((role) =>
      convertToRole(role as roles_roles_nodes)
    ) ?? [];

  useEffect(() => {
    if (userId) {
      dispatch(setLoader(true));
      getUser(userId)
        .then((data) => {
          setUser(data);
          dispatch(setToInitialLoader());
          setMode(IMode.EDIT);
        })
        .catch((e) => {
          console.error(e);
          navigate(userListNavigate);
          dispatch(setToInitialLoader());
        });
    } else if (match) {
      setMode(IMode.ADD);
    } else {
      navigate(userListNavigate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    void reset(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleClose = () => navigate(userListNavigate);

  const handleSumbitEdit = async (user: IUser) => {
    dispatch(setLoader(true));
    updateUser(user)
      .then(() => {
        dispatch(setToInitialLoader());
        dispatch(
          setSnackBar({
            open: true,
            message: 'Utilizador atualizado com sucesso!',
            type: MessageType.SUCCESS
          })
        );
        navigate(userListNavigate);
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

  const handleSumbitAdd = async (user: IUser) => {
    dispatch(setLoader(true));
    createUser(user)
      .then(() => {
        dispatch(setToInitialLoader());
        dispatch(
          setSnackBar({
            open: true,
            message: 'Utilizador criado com sucesso!',
            type: MessageType.SUCCESS
          })
        );
        navigate(userListNavigate);
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

            <UserDetails {...{ roles }} />
          </>
        )}
      </FormProvider>
    </>
  );
}
