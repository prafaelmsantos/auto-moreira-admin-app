import { useQuery } from '@apollo/client';
import Table from '../../../components/table/Table';
import { VEHICLES } from './models/graphQL/Vehicles';
import { convertToVehicle } from './models/Vehicle';
import { useNavigate } from 'react-router-dom';
import GetActions from '../../../components/base/Actions';
import PageHolder from '../../../components/base/PageHolder';
import { IMode } from '../../../models/enums/Base';
import { addVehicleNavigate } from './views/utils/Utils';

import { useEffect, useState } from 'react';
import {
  vehicles,
  vehicles_vehicles_nodes
} from './models/graphQL/types/vehicles';
import columns from './views/components/columns/VehicleColumns';
import { useAppDispatch } from '../../../redux/hooks';
import { MessageType } from '../../../models/enums/MessageTypeEnum';
import { setLoader, setToInitialLoader } from '../../../redux/loaderSlice';
import { postData } from '../../../services/AutoMoreiraService';
import { BASE_API_URL } from '../../../config/variables';
import { setSnackBar } from '../../../redux/snackBarSlice';
import { setModal } from '../../../redux/modalSlice';
import AlertModal from '../../../components/modal/AlertModal';

export default function Vehicles() {
  const [idsToDelete, setIdsToDelete] = useState<number[]>([]);
  const navigate = useNavigate();
  const { data, loading, refetch } = useQuery<vehicles>(VEHICLES);

  const rows =
    data?.vehicles?.nodes
      ?.map((vehicle) => convertToVehicle(vehicle as vehicles_vehicles_nodes))
      ?.sort((a, b) => a.id - b.id) ?? [];

  const handleAdd = () => navigate(addVehicleNavigate);

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
    postData(`${BASE_API_URL}api/vehicles/delete`, idsToDelete)
      .then(() => {
        dispatch(setToInitialLoader());
        setStateModal({ ...stateModal, isOpen: false });
        dispatch(
          setSnackBar({
            open: true,
            message: `${
              idsToDelete.length === 1 ? 'Veículo apagado' : 'Veículos apagados'
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
                  ? 'o veículo selecionado'
                  : 'os veículos selecionados'
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
