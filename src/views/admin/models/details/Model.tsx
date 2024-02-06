import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../redux/hooks';
import { useEffect, useState } from 'react';
import { setLoader, setToInitialLoader } from '../../../../redux/loaderSlice';
import { getData } from '../../../../services/AutoMoreiraService';
import { BASE_API_URL } from '../../../../config/variables';
import { IMode } from '../../../../models/enums/Base';
import PageHolder from '../../../../components/base/PageHolder';
import GetActions from '../../../../components/base/Actions';

import { IModel } from '../models/Model';
import { addModelNavigate, modelListNavigate } from '../utils/Utils';
import ModelDetails from './ModelDetails';
import ModelValidationService from '../services/ModelValidationService';
import { useQuery } from '@apollo/client';
import { MARKS } from '../../marks/queries/Marks';
import { convertToMark } from '../../marks/models/Mark';
import { createModel, updateModel } from '../services/ModelService';
import { MessageType } from '../../../../models/enums/MessageTypeEnum';
import { setSnackBar } from '../../../../redux/snackBarSlice';
import { setModal } from '../../../../redux/modalSlice';
import { marks_marks_nodes, marks } from '../../marks/queries/types/marks';

export default function Model() {
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [model, setModel] = useState<IModel>({ id: 0, name: '', markId: 0 });
  const markId = Number(param.id);
  const match = useMatch(addModelNavigate);
  const [mode, setMode] = useState<IMode>();
  const { data } = useQuery<marks>(MARKS);
  const marks =
    data?.marks?.nodes?.map((mark) =>
      convertToMark(mark as marks_marks_nodes)
    ) ?? [];

  useEffect(() => {
    if (markId) {
      dispatch(setLoader(true));
      const endpoint = `${BASE_API_URL}${'api/models/'}${markId}`;
      getData<IModel>(`${endpoint}`)
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
  }, [markId]);

  const handleClose = () => navigate(modelListNavigate);

  const [handleSubmit, errors, control] = ModelValidationService(model);

  const handleSumbitEdit = async (model: IModel) => {
    dispatch(setLoader(true));
    updateModel(model)
      .then((data) => {
        setModel(data);
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
      .then((data) => {
        setModel(data);
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
      {mode && (
        <>
          <PageHolder
            actions={GetActions({
              ...{ mode, handleClose },
              handleSubmitEdit: handleSubmit(handleSumbitEdit),
              handleSumbitAdd: handleSubmit(handleSumbitAdd)
            })}
          />
          <ModelDetails {...{ model, errors, marks, control }} />
        </>
      )}
    </>
  );
}
