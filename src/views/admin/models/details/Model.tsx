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
import { marks, marks_marks_nodes } from '../../../../queries/types/marks';
import { MARKS } from '../../../../queries/Marks';
import { convertToMark } from '../../marks/models/Mark';

export default function Model() {
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [model, setModel] = useState<IModel>({ id: 0, name: '', markId: 0 });
  const markId = Number(param.id);
  const match = useMatch(addModelNavigate);
  const [mode, setMode] = useState<IMode>();
  const { data, loading } = useQuery<marks>(MARKS);
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

  const [handleSubmit, reset, errors, isSubmitSuccessful, control] =
    ModelValidationService(model);

  const handleSumbitEdit = async (model: IModel) => {
    console.log(model);
    if (model) {
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

  const handleSumbitAdd = async (model: IModel) => {
    console.log(model);
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
