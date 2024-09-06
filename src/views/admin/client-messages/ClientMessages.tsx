import { useQuery } from '@apollo/client';

import { CLIENT_MESSAGES } from './models/graphQL/ClientMessages';
import { convertToClientMessage } from './models/ClientMessage';
import Table from '../../../components/table/Table';
import {
  clientMessages,
  clientMessages_clientMessages_nodes
} from './models/graphQL/types/clientMessages';
import { useEffect, useState } from 'react';
import GetActions from '../../../components/base/Actions';
import { IMode } from '../../../models/enums/Base';
import PageHolder from '../../../components/base/PageHolder';
import { useAppDispatch } from '../../../redux/hooks';
import { setLoader, setToInitialLoader } from '../../../redux/loaderSlice';
import { BASE_API_URL } from '../../../config/variables';
import { postData } from '../../../services/AutoMoreiraService';
import AlertModal from '../../../components/modal/AlertModal';
import { MessageType } from '../../../models/enums/MessageTypeEnum';
import { setSnackBar } from '../../../redux/snackBarSlice';
import { setModal } from '../../../redux/modalSlice';
import columns from './views/components/test/ClientMessageColumns';

export default function ClientMessages() {
  const [idsToDelete, setIdsToDelete] = useState<number[]>([]);
  const { data, loading, refetch } = useQuery<clientMessages>(CLIENT_MESSAGES, {
    variables: {
      order: { id: 'DESC' },
      first: 1000
    }
  });

  const rows =
    data?.clientMessages?.nodes?.map((clientMessage) =>
      convertToClientMessage(
        clientMessage as clientMessages_clientMessages_nodes
      )
    ) ?? [];

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
    postData(`${BASE_API_URL}api/clientMessages/delete`, idsToDelete)
      .then(() => {
        dispatch(setToInitialLoader());
        setStateModal({ ...stateModal, isOpen: false });
        dispatch(
          setSnackBar({
            open: true,
            message: `${
              idsToDelete.length === 1
                ? 'Mensagem de cliente apagada'
                : 'Mensagens de clientes apagadas'
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
          handleSubmitDelete: () =>
            setStateModal({
              ...stateModal,
              message: `Tem a certeza que pretende apagar ${
                idsToDelete.length === 1
                  ? 'a mensagem de cliente selecionada'
                  : 'as mensagens de clientes selecionadas'
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
