import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { ROLES } from './models/graphQL/Roles';

import { convertToRole } from './models/Role';
import { useEffect, useState } from 'react';
import PageHolder from '../../../../components/base/PageHolder';
import GetActions from '../../../../components/base/Actions';
import { IMode } from '../../../../models/enums/Base';
import Table from '../../../../components/table/Table';
import { addRoleNavigate } from './views/components/utils/Utils';
import { roles, roles_roles_nodes } from './models/graphQL/types/roles';
import columns from './views/components/columns/RoleColumns';
import { useAppDispatch } from '../../../../redux/hooks';
import { MessageType } from '../../../../models/enums/MessageTypeEnum';
import { setLoader, setToInitialLoader } from '../../../../redux/loaderSlice';
import { BASE_API_URL } from '../../../../config/variables';
import { postData } from '../../../../services/AutoMoreiraService';
import { setSnackBar } from '../../../../redux/snackBarSlice';
import { setModal } from '../../../../redux/modalSlice';
import AlertModal from '../../../../components/modal/AlertModal';

export default function Roles() {
  const navigate = useNavigate();
  const { data, loading, refetch } = useQuery<roles>(ROLES);
  const [idsToDelete, setIdsToDelete] = useState<number[]>([]);

  const rows =
    data?.roles?.nodes
      ?.map((role) => convertToRole(role as roles_roles_nodes))
      ?.sort((a, b) => a.id - b.id) ?? [];

  const handleAdd = () => navigate(addRoleNavigate);

  useEffect(() => {
    void refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [stateModal, setStateModal] = useState({
    isOpen: false,
    message: '',
    title: 'Aviso',
    type: MessageType.WARNING
  });

  const dispatch = useAppDispatch();

  const handleSumbitDelete = async () => {
    dispatch(setLoader(true));
    postData(`${BASE_API_URL}api/roles/delete`, idsToDelete)
      .then(() => {
        dispatch(setToInitialLoader());
        setStateModal({ ...stateModal, isOpen: false });
        dispatch(
          setSnackBar({
            open: true,
            message: `${
              idsToDelete.length === 1 ? 'Cargo apagado' : 'Cargos apagados'
            } com sucesso!`,
            type: MessageType.SUCCESS
          })
        );
        refetch && void refetch();
      })
      .catch((e: Error) => {
        console.error(e);
        dispatch(setToInitialLoader());
        setStateModal({ ...stateModal, isOpen: false });
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
    <main>
      <AlertModal
        title={stateModal.title}
        message={stateModal.message}
        isOpen={stateModal.isOpen}
        onOk={() => handleSumbitDelete()}
        onCancel={() => setStateModal({ ...stateModal, isOpen: false })}
        type={stateModal.type}
      />
      <PageHolder
        actions={GetActions({
          mode: IMode.LIST,
          idsToDelete,
          handleAdd,
          handleSubmitDelete: () =>
            setStateModal({
              ...stateModal,
              message: `Tem a certeza que pretende apagar ${
                idsToDelete.length === 1
                  ? 'o cargo selecionado'
                  : 'os cargos selecionados'
              }?`,
              isOpen: true
            })
        })}
      />
      <Table
        columns={columns(refetch)}
        {...{ rows, loading, setIdsToDelete }}
      />
    </main>
  );
}
