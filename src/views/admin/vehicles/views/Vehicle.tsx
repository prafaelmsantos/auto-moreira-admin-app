import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../redux/hooks';
import { useEffect, useState } from 'react';
import { setLoader, setToInitialLoader } from '../../../../redux/loaderSlice';
import { IMode } from '../../../../models/enums/Base';
import PageHolder from '../../../../components/base/PageHolder';
import GetActions from '../../../../components/base/Actions';

import { useQuery } from '@apollo/client';
import { MARKS } from '../../marks/models/graphQL/Marks';
import { convertToMark } from '../../marks/models/Mark';
import { IVehicle } from '../models/Vehicle';
import { addVehicleNavigate, vehicleListNavigate } from './utils/Utils';
import { MODELS } from '../../models/models/graphQL/Models';
import { convertToModel } from '../../models/models/Model';
import VehicleDetails from './details/VehicleDetails';
import VehicleValidationService from '../services/VehicleValidationService';
import {
  createVehicle,
  getVehicle,
  updateVehicle
} from '../services/VehicleService';
import { setSnackBar } from '../../../../redux/snackBarSlice';
import { MessageType } from '../../../../models/enums/MessageTypeEnum';
import { setModal } from '../../../../redux/modalSlice';
import {
  marks_marks_nodes,
  marks
} from '../../marks/models/graphQL/types/marks';
import {
  models_models_nodes,
  models
} from '../../models/models/graphQL/types/models';

export default function Vehicle() {
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [vehicle, setVehicle] = useState<IVehicle>({
    id: 0,
    modelId: 0,
    model: { id: 0, name: '', markId: 0 },
    year: new Date().getFullYear(),
    color: '',
    mileage: 0,
    price: 0,
    fuelType: null,
    doors: 0,
    transmission: null,
    engineSize: 0,
    power: 0,
    opportunity: false,
    sold: false
  });
  const vehicleId = Number(param.id);
  const match = useMatch(addVehicleNavigate);
  const [mode, setMode] = useState<IMode>();
  const { data: marksData } = useQuery<marks>(MARKS);
  const { data: modelsData } = useQuery<models>(MODELS);

  const marks =
    marksData?.marks?.nodes
      ?.map((mark) => convertToMark(mark as marks_marks_nodes))
      ?.sort((a, b) => a.id - b.id) ?? [];

  const models =
    modelsData?.models?.nodes
      ?.filter((x) => x?.id === vehicle.model.markId)
      ?.map((model) => convertToModel(model as models_models_nodes))
      ?.sort((a, b) => a.id - b.id) ?? [];

  useEffect(() => {
    if (vehicleId) {
      dispatch(setLoader(true));
      getVehicle(vehicleId)
        .then((data) => {
          setVehicle(data);
          dispatch(setToInitialLoader());
          setMode(IMode.EDIT);
        })
        .catch((e) => {
          console.error(e);
          navigate(vehicleListNavigate);
          dispatch(setToInitialLoader());
        });
    } else if (match) {
      setMode(IMode.ADD);
    } else {
      navigate(vehicleListNavigate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicleId]);

  const handleClose = () => navigate(vehicleListNavigate);

  const [handleSubmit, errors, control, watch, setValue] =
    VehicleValidationService(vehicle);

  useEffect(() => {
    watch((value) =>
      setVehicle((old) => ({
        ...old,
        modelId: value?.modelId ?? 0,
        model: { ...old.model, markId: value.model?.markId ?? 0 }
      }))
    );
  }, [watch]);

  useEffect(() => {
    watch((value) => console.log(value));
  }, [watch]);

  const handleSumbitEdit = async (vehicle: IVehicle) => {
    dispatch(setLoader(true));
    updateVehicle(vehicle)
      .then(() => {
        dispatch(setToInitialLoader());
        dispatch(
          setSnackBar({
            open: true,
            message: 'Veículo atualizado com sucesso!',
            type: MessageType.SUCCESS
          })
        );
        navigate(vehicleListNavigate);
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

  const handleSumbitAdd = async (vehicle: IVehicle) => {
    dispatch(setLoader(true));
    createVehicle(vehicle)
      .then(() => {
        dispatch(setToInitialLoader());
        dispatch(
          setSnackBar({
            open: true,
            message: 'Veículo criado com sucesso!',
            type: MessageType.SUCCESS
          })
        );
        navigate(vehicleListNavigate);
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
          <VehicleDetails
            {...{ vehicle, marks, models, errors, control, setValue }}
          />
        </>
      )}
    </>
  );
}
