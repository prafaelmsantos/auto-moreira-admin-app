import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { IMark } from '../models/Mark';
import { useAppDispatch } from '../../../../redux/hooks';
import { useEffect, useState } from 'react';
import { setLoader, setToInitialLoader } from '../../../../redux/loaderSlice';
import { getData } from '../../../../services/AutoMoreiraService';
import { BASE_API_URL } from '../../../../config/variables';
import MarkDetails from './MarkDetails';
import { IMode } from '../../../../models/enums/Base';
import PageHolder from '../../../../components/base/PageHolder';
import GetActions from '../../../../components/base/Actions';
import { addMarkNavigate, markListNavigate } from '../utils/Utils';

import MarkValidationService from '../services/MarkValidationService';

export default function Mark() {
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
      const endpoint = `${BASE_API_URL}${'api/marks/'}${Number(param.id)}`;
      getData<IMark>(`${endpoint}`)
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

  //const handleSumbitEdit = () => {};
  const handleClose = () => navigate(markListNavigate);

  const [handleSubmit, reset, errors, isSubmitSuccessful, control] =
    MarkValidationService();
  const handleSumbitEdit = async (mark: IMark) => {
    console.log(mark);
    if (mark) {
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

  const handleSumbitAdd = async (mark: IMark) => {
    console.log(mark);
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

          <MarkDetails {...{ mark, errors, control }} />
        </>
      )}
    </>
  );
}
