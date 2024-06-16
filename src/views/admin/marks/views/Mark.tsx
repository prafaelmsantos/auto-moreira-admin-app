import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { IMark } from '../models/Mark';
import { useAppDispatch } from '../../../../redux/hooks';
import { useEffect, useState } from 'react';
import { setLoader, setToInitialLoader } from '../../../../redux/loaderSlice';
import MarkDetails from './details/MarkDetails';
import { IMode } from '../../../../models/enums/Base';
import PageHolder from '../../../../components/base/PageHolder';
import GetActions from '../../../../components/base/Actions';
import { addMarkNavigate, markListNavigate } from './utils/Utils';
import {
  IMarkValidationSchema,
  markValidationSchema
} from '../services/MarkValidationSchema';
import { createMark, getMark, updateMark } from '../services/MarkService';
import { setModal } from '../../../../redux/modalSlice';
import { MessageType } from '../../../../models/enums/MessageTypeEnum';
import { setSnackBar } from '../../../../redux/snackBarSlice';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Mark() {
  const methods = useForm<IMarkValidationSchema>({
    resolver: async (data, context, options) =>
      await zodResolver(markValidationSchema)(data, context, options),
    mode: 'all',
    reValidateMode: 'onChange',
    shouldFocusError: true
  });

  const { reset, handleSubmit } = methods;

  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [mark, setMark] = useState<IMark>({ id: 0, name: '' });
  const markId = Number(param.id);
  const match = useMatch(addMarkNavigate);
  const [mode, setMode] = useState<IMode>();

  useEffect(() => {
    if (markId) {
      dispatch(setLoader(true));
      getMark(markId)
        .then((data) => {
          setMark(data);
          dispatch(setToInitialLoader());
          setMode(IMode.EDIT);
        })
        .catch((e) => {
          console.error(e);
          navigate(markListNavigate);
          dispatch(setToInitialLoader());
        });
    } else if (match) {
      setMode(IMode.ADD);
    } else {
      navigate(markListNavigate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markId]);

  useEffect(() => {
    void reset(mark);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mark]);

  const handleClose = () => navigate(markListNavigate);

  const handleSumbitEdit = async (mark: IMark) => {
    dispatch(setLoader(true));
    updateMark(mark)
      .then(() => {
        dispatch(setToInitialLoader());
        dispatch(
          setSnackBar({
            open: true,
            message: 'Marca atualizada com sucesso!',
            type: MessageType.SUCCESS
          })
        );
        navigate(markListNavigate);
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

  const handleSumbitAdd = async (mark: IMark) => {
    dispatch(setLoader(true));
    createMark(mark)
      .then(() => {
        dispatch(setToInitialLoader());
        dispatch(
          setSnackBar({
            open: true,
            message: 'Marca criada com sucesso!',
            type: MessageType.SUCCESS
          })
        );
        navigate(markListNavigate);
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

            <MarkDetails />
          </>
        )}
      </FormProvider>
    </>
  );
}
