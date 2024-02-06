import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../redux/hooks';
import { useEffect, useState } from 'react';
import { setLoader, setToInitialLoader } from '../../../../redux/loaderSlice';
import { getData } from '../../../../services/AutoMoreiraService';
import { BASE_API_URL } from '../../../../config/variables';
import { IMode } from '../../../../models/enums/Base';
import PageHolder from '../../../../components/base/PageHolder';
import GetActions from '../../../../components/base/Actions';

import { useQuery } from '@apollo/client';
import { MARKS } from '../../marks/queries/Marks';
import { convertToMark } from '../../marks/models/Mark';
import { IVehicle } from '../models/Vehicle';
import { addVehicleNavigate, vehicleListNavigate } from '../utils/Utils';
import { MODELS } from '../../models/queries/Models';
import { convertToModel } from '../../models/models/Model';
import VehicleDetails from './VehicleDetails';
import { marks_marks_nodes, marks } from '../../marks/queries/types/marks';
import { models_models_nodes, models } from '../../models/queries/types/models';
import VehicleValidationService from '../services/VehicleValidationService';

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
  const { data: modelsData } = useQuery<models>(MODELS, {
    variables: {
      filter:
        vehicle.model.markId !== 0
          ? {
              markId: { eq: vehicle.model.markId }
            }
          : null
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
      const endpoint = `${BASE_API_URL}${'api/vehicles/'}${vehicleId}`;
      getData<IVehicle>(`${endpoint}`)
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

  const [handleSubmit, errors, control] = VehicleValidationService(vehicle);

  const handleSumbitEdit = async (vehicle: IVehicle) => {
    console.log(vehicle);
    if (vehicle) {
      /* const response = await MarkService.PUT(mark);
      if (response) {
        if (response.ok) {
          dispatch(
            setSnackBar({
              open: true,
              message: 'Marca criada com sucesso!',
              type: MessageType.SUCCESS
            })
          );

          isSubmitSuccessful &&
            reset({
              name: ''
            });
          return Promise.resolve();
        } else {
          const messageError = response
            .json()
            .then((response) => response.message)
            .then((x) => x as string);
          dispatch(
            setModal({
              title: 'Erro Interno do Servidor',
              message: (await messageError).toString(),
              type: MessageType.ERROR,
              open: true
            })
          );
          return Promise.reject();
        }
      } */
    }
  }; // your form submit function which will invoke after successful validation

  const handleSumbitAdd = async (vehicle: IVehicle) => {
    console.log(vehicle);
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
          <VehicleDetails {...{ vehicle, marks, models, errors, control }} />
        </>
      )}
    </>
  );
}
