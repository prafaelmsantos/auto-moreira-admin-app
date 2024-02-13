import { useEffect, useState } from 'react';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../redux/hooks';
import { IRole } from '../models/Role';
import { addRoleNavigate, roleListNavigate } from './components/utils/Utils';
import { setLoader, setToInitialLoader } from '../../../../redux/loaderSlice';
import { createRole, getRole, updateRole } from '../services/RoleService';
import { IMode } from '../../../../models/enums/Base';
import RoleValidationService from '../services/RoleValidationService';
import { setSnackBar } from '../../../../redux/snackBarSlice';
import { MessageType } from '../../../../models/enums/MessageTypeEnum';
import { setModal } from '../../../../redux/modalSlice';
import PageHolder from '../../../../components/base/PageHolder';
import GetActions from '../../../../components/base/Actions';
import RoleDetails from './details/RoleDetails';

export default function Role() {
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [role, setRole] = useState<IRole>({ id: 0, name: '' });
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

  const handleClose = () => navigate(roleListNavigate);

  const [handleSubmit, errors, control] = RoleValidationService(role);

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
      {mode && (
        <>
          <PageHolder
            actions={GetActions({
              ...{ mode, handleClose },
              handleSubmitEdit: handleSubmit(handleSumbitEdit),
              handleSumbitAdd: handleSubmit(handleSumbitAdd)
            })}
          />

          <RoleDetails {...{ role, errors, control }} />
        </>
      )}
    </>
  );
}
