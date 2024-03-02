import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../redux/hooks';
import { useEffect, useState } from 'react';
import { setLoader, setToInitialLoader } from '../../../../redux/loaderSlice';
import { IMode } from '../../../../models/enums/Base';
import PageHolder from '../../../../components/base/PageHolder';
import GetActions from '../../../../components/base/Actions';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { useQuery } from '@apollo/client';
import { MARKS } from '../../marks/models/graphQL/Marks';
import { convertToMark } from '../../marks/models/Mark';
import { IVehicle } from '../models/Vehicle';
import { addVehicleNavigate, vehicleListNavigate } from './utils/Utils';
import { MODELS } from '../../vehicle-models/models/graphQL/Models';
import { convertToModel } from '../../vehicle-models/models/Model';
import VehicleDetails from './details/VehicleDetails';
import TabContext from '@mui/lab/TabContext';
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
import { Typography } from '@mui/material';
import {
  models_models_nodes,
  models
} from '../../vehicle-models/models/graphQL/types/models';

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

  const [value, setValue] = useState('1');

  useEffect(() => {
    void reset(vehicle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicle, value]);

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

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <FormProvider {...methods}>
        {mode && (
          <>
            <Box sx={{ width: '100%', typography: 'body1' }}></Box>
            <PageHolder
              actions={GetActions({
                ...{ mode, handleClose },
                handleSubmitEdit: handleSubmit(handleSumbitEdit),
                handleSumbitAdd: handleSubmit(handleSumbitAdd)
              })}
            />
            <TabContext value={value}>
              <Box>
                <TabList
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                >
                  <Tab label={'Informação'} value="1" />
                  <Tab label={<Typography>Imagens</Typography>} value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <VehicleDetails {...{ vehicle, marks, models }} />
              </TabPanel>
              <TabPanel value="2">Item Two</TabPanel>
              <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
          </>
        )}
      </FormProvider>
    </>
  );
}
