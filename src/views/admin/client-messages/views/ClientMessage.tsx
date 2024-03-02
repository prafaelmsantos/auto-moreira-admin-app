import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../redux/hooks';
import { useCallback, useEffect, useState } from 'react';
import { IClientMessage } from '../models/ClientMessage';
import { IMode } from '../../../../models/enums/Base';
import { setLoader, setToInitialLoader } from '../../../../redux/loaderSlice';
import {
  getClientMessage,
  updateClientMessage
} from '../services/ClientMessageService';
import { clientMessageListNavigate } from './utils/Utils';
import GetActions from '../../../../components/base/Actions';
import PageHolder from '../../../../components/base/PageHolder';
import ClientMessageDetails from './details/ClientMessageDetails';
import { Status } from '../models/enums/StatusEnum';
import { setSnackBar } from '../../../../redux/snackBarSlice';
import { MessageType } from '../../../../models/enums/MessageTypeEnum';
import { setModal } from '../../../../redux/modalSlice';

export default function ClientMessage() {
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [clientMessage, setClientMessage] = useState<IClientMessage>({
    id: 0,
    name: '',
    email: '',
    createdDate: new Date(),
    status: Status.OPEN,
    phoneNumber: 0,
    message: ''
  });
  const clientMessageId = Number(param.id);

  useEffect(() => {
    if (clientMessageId) {
      dispatch(setLoader(true));
      getClientMessage(clientMessageId)
        .then((data) => {
          setClientMessage(data);
          dispatch(setToInitialLoader());
        })
        .catch((e) => {
          console.error(e);
          navigate(clientMessageListNavigate);
          dispatch(setToInitialLoader());
        });
    } else {
      navigate(clientMessageListNavigate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientMessageId]);

  const handleClose = () => navigate(clientMessageListNavigate);

  const handleSumbitEdit = async () => {
    dispatch(setLoader(true));
    updateClientMessage(clientMessage.id, clientMessage.status)
      .then(() => {
        dispatch(setToInitialLoader());
        dispatch(
          setSnackBar({
            open: true,
            message: 'Status da mensagem de cliente atualizada com sucesso!',
            type: MessageType.SUCCESS
          })
        );
        navigate(clientMessageListNavigate);
      })
      .catch((e) => {
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
      <PageHolder
        actions={GetActions({
          ...{ handleClose },
          handleSubmitEdit: handleSumbitEdit,
          mode: IMode.EDIT
        })}
      />

      <ClientMessageDetails {...{ clientMessage, setClientMessage }} />
    </>
  );
}
