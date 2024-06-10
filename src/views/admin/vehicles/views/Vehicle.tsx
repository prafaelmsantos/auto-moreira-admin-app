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
import { IVehicle, IVehicleImage } from '../models/Vehicle';
import { addVehicleNavigate, vehicleListNavigate } from './utils/Utils';
import { MODELS } from '../../vehicle-models/models/graphQL/Models';
import { convertToModel } from '../../vehicle-models/models/Model';
import VehicleDetails from './details/VehicleDetails';
import { VehicleValidationSchema } from '../services/VehicleValidationSchema';
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

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  models_models_nodes,
  models
} from '../../vehicle-models/models/graphQL/types/models';
import VehicleImages from './images/VehicleImages';

export default function Vehicle() {
  const methods = useForm<IVehicle>({
    resolver: yupResolver(VehicleValidationSchema)
  });

  const { reset, handleSubmit } = methods;
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
    sold: false,
    soldDate: null,
    vehicleImages: []
  });

  const vehicleId = Number(param.id);
  const match = useMatch(addVehicleNavigate);
  const [mode, setMode] = useState<IMode>();
  const { data: marksData } = useQuery<marks>(MARKS, {
    variables: {
      order: { id: 'ASC' },
      first: 500
    }
  });
  const { data: modelsData } = useQuery<models>(MODELS, {
    variables: {
      order: { id: 'ASC' },
      first: 500
    }
  });

  const marks =
    marksData?.marks?.nodes?.map((mark) =>
      convertToMark(mark as marks_marks_nodes)
    ) ?? [];

  const models =
    modelsData?.models?.nodes?.map((model) =>
      convertToModel(model as models_models_nodes)
    ) ?? [];

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

  useEffect(() => {
    void reset(vehicle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicle]);

  const handleClose = () => navigate(vehicleListNavigate);

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

  const handleChangeImages = (vehicleImages: IVehicleImage[]) => {
    if (vehicleImages.length !== 0) vehicleImages[0].isMain = true;
    setVehicle((old) => ({ ...old, vehicleImages: vehicleImages }));
  };

  return (
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

          <VehicleDetails {...{ vehicle, marks, models }} />

          <VehicleImages
            vehicleImages={vehicle.vehicleImages}
            {...{ handleChangeImages }}
          />
        </>
      )}
    </FormProvider>
  );
}
