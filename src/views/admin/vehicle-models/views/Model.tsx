import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../redux/hooks';
import { useEffect, useState } from 'react';
import { setLoader, setToInitialLoader } from '../../../../redux/loaderSlice';
import { IMode } from '../../../../models/enums/Base';
import PageHolder from '../../../../components/base/PageHolder';
import GetActions from '../../../../components/base/Actions';

import { IModel } from '../models/Model';
import { addModelNavigate, modelListNavigate } from './utils/Utils';
import ModelDetails from './details/ModelDetails';
import { ModelValidationSchema } from '../services/ModelValidationSchema';
import { useQuery } from '@apollo/client';
import { MARKS } from '../../marks/models/graphQL/Marks';
import { convertToMark } from '../../marks/models/Mark';
import { createModel, getModel, updateModel } from '../services/ModelService';
import { MessageType } from '../../../../models/enums/MessageTypeEnum';
import { setSnackBar } from '../../../../redux/snackBarSlice';
import { setModal } from '../../../../redux/modalSlice';
import {
  marks_marks_nodes,
  marks
} from '../../marks/models/graphQL/types/marks';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export default function Model() {
  const methods = useForm<IModel>({
    resolver: yupResolver(ModelValidationSchema)
  });

  const { reset, handleSubmit } = methods;
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [model, setModel] = useState<IModel>({ id: 0, name: '', markId: 0 });
  const modelId = Number(param.id);
  const match = useMatch(addModelNavigate);
  const [mode, setMode] = useState<IMode>();
  const { data } = useQuery<marks>(MARKS, {
    variables: {
      first: 500
    }
  });
  const marks =
    data?.marks?.nodes?.map((mark) =>
      convertToMark(mark as marks_marks_nodes)
    ) ?? [];

  useEffect(() => {
    if (modelId) {
      dispatch(setLoader(true));
      getModel(modelId)
        .then((data) => {
          setModel(data);
          dispatch(setToInitialLoader());
          setMode(IMode.EDIT);
        })
        .catch((e) => {
          console.error(e);
          navigate(modelListNavigate);
          dispatch(setToInitialLoader());
        });
    } else if (match) {
      setMode(IMode.ADD);
    } else {
      navigate(modelListNavigate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelId]);

  useEffect(() => {
    void reset(model);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model]);

  const handleClose = () => navigate(modelListNavigate);

  const handleSumbitEdit = async (model: IModel) => {
    dispatch(setLoader(true));
    updateModel(model)
      .then(() => {
        dispatch(setToInitialLoader());
        dispatch(
          setSnackBar({
            open: true,
            message: 'Modelo atualizado com sucesso!',
            type: MessageType.SUCCESS
          })
        );
        navigate(modelListNavigate);
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

  const handleSumbitAdd = async (model: IModel) => {
    dispatch(setLoader(true));
    createModel(model)
      .then(() => {
        dispatch(setToInitialLoader());
        dispatch(
          setSnackBar({
            open: true,
            message: 'Modelo criado com sucesso!',
            type: MessageType.SUCCESS
          })
        );
        navigate(modelListNavigate);
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
            <ModelDetails {...{ marks }} />
          </>
        )}
      </FormProvider>
    </>
  );
}
