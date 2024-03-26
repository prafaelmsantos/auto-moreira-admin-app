import { Tooltip, IconButton } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { RouteName } from '../../../models/enums/RouteType';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../../modal/AlertModal';
import { MessageType } from '../../../models/enums/MessageTypeEnum';
import { useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { postData } from '../../../services/AutoMoreiraService';
import { setLoader, setToInitialLoader } from '../../../redux/loaderSlice';
import { BASE_API_URL } from '../../../config/variables';
import { setSnackBar } from '../../../redux/snackBarSlice';
import { setModal } from '../../../redux/modalSlice';
import { ActionName, ActionSubs } from './ActionsUtils';

interface IActions {
  editTitle?: string;
  deleteTitle: string;
  routeName: RouteName;
  id: number;
  deleteDisabled?: boolean;
  editDisabled?: boolean;
  refetch: () => void;
}

export default function Actions({
  editTitle,
  deleteTitle,
  deleteDisabled,
  editDisabled,
  routeName,
  id,
  refetch
}: IActions) {
  const navigate = useNavigate();
  const [stateModal, setStateModal] = useState({
    isOpen: false,
    message: '',
    title: '',
    type: MessageType.WARNING
  });
  const dispatch = useAppDispatch();

  const handleSumbitDelete = async () => {
    dispatch(setLoader(true));
    postData(
      `${BASE_API_URL}api/${
        routeName === RouteName.CLIENT_MESSAGES ? 'clientMessages' : routeName
      }/delete`,
      [id]
    )
      .then(() => {
        dispatch(setToInitialLoader());
        setStateModal({ ...stateModal, isOpen: false });
        dispatch(
          setSnackBar({
            open: true,
            message: `${ActionName(routeName)} apagad${ActionSubs(
              routeName
            )} com sucesso!`,
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
    <>
      <AlertModal
        title={stateModal.title}
        message={stateModal.message}
        isOpen={stateModal.isOpen}
        onOk={() => handleSumbitDelete()}
        onCancel={() => setStateModal({ ...stateModal, isOpen: false })}
        type={stateModal.type}
      />
      <Tooltip title={editTitle} arrow>
        <IconButton
          disabled={editDisabled}
          onClick={() => navigate(`/admin/${routeName}/${id}`)}
          sx={{
            '&:hover': {
              background: blue[100]
            },
            color: blue[500]
          }}
          color="inherit"
          size="small"
        >
          <EditTwoToneIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title={deleteTitle} arrow>
        <IconButton
          disabled={deleteDisabled}
          onClick={() =>
            setStateModal({
              ...stateModal,
              isOpen: true,
              title: 'Aviso',
              message: `Tem a certeza que pretende apagar ${ActionSubs(
                routeName
              )} ${ActionName(routeName)}?`
            })
          }
          sx={{
            '&:hover': { background: red[100] },
            color: red[500]
          }}
          color="inherit"
          size="small"
        >
          <DeleteTwoToneIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </>
  );
}
