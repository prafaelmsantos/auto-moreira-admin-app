import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../redux/hooks';
import { useEffect, useState } from 'react';
import { IClientMessage } from '../models/ClientMessage';
import { IMode } from '../../../../models/enums/Base';
import { setLoader, setToInitialLoader } from '../../../../redux/loaderSlice';
import { getClientMessage } from '../services/ClientMessageService';
import { clientMessageListNavigate } from './utils/Utils';
import GetActions from '../../../../components/base/Actions';
import PageHolder from '../../../../components/base/PageHolder';
import ClientMessageDetails from './details/ClientMessageDetails';

export default function ClientMessage() {
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [clientMessage, setClientMessage] = useState<IClientMessage>();
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

  const handleSumbitEdit = async () => {};

  return (
    <>
      <PageHolder
        actions={GetActions({
          ...{ handleClose },
          handleSubmitEdit: handleSumbitEdit,
          mode: IMode.EDIT
        })}
      />
      {clientMessage && <ClientMessageDetails {...{ clientMessage }} />}
    </>
  );
}
