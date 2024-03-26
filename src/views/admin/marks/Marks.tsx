import { useQuery } from '@apollo/client';
import { convertToMark } from './models/Mark';
import { MARKS } from './models/graphQL/Marks';
import Table from '../../../components/table/Table';
import PageHolder from '../../../components/base/PageHolder';
import { IMode } from '../../../models/enums/Base';
import GetActions from '../../../components/base/Actions';

import { useNavigate } from 'react-router-dom';
import { addMarkNavigate } from './views/utils/Utils';
import { useEffect, useState } from 'react';
import { marks, marks_marks_nodes } from './models/graphQL/types/marks';
import columns from './views/components/MarkColumns';
import { MessageType } from '../../../models/enums/MessageTypeEnum';
import { useAppDispatch } from '../../../redux/hooks';
import { setLoader, setToInitialLoader } from '../../../redux/loaderSlice';
import { postData } from '../../../services/AutoMoreiraService';
import { BASE_API_URL } from '../../../config/variables';
import { setSnackBar } from '../../../redux/snackBarSlice';
import { setModal } from '../../../redux/modalSlice';
import AlertModal from '../../../components/modal/AlertModal';

export default function Marks() {
  const [idsToDelete, setIdsToDelete] = useState<number[]>([]);
  const navigate = useNavigate();
  const { data, loading, refetch } = useQuery<marks>(MARKS);

  const rows =
    data?.marks?.nodes
      ?.map((mark) => convertToMark(mark as marks_marks_nodes))
      ?.sort((a, b) => a.id - b.id) ?? [];

  const handleAdd = () => navigate(addMarkNavigate);

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
    postData(`${BASE_API_URL}api/marks/delete`, idsToDelete)
      .then(() => {
        dispatch(setToInitialLoader());
        setStateModal({ ...stateModal, isOpen: false });
        dispatch(
          setSnackBar({
            open: true,
            message: `${
              idsToDelete.length === 1 ? 'Marca apagada' : 'Marcas apagadas'
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
                  ? 'a marca selecionada'
                  : 'as marcas selecionadas'
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
