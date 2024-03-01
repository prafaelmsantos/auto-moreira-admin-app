import { useCallback, useEffect, useState } from 'react';
import { IUser } from '../../models/User';
import Banner from './banner/Banner';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../../redux/hooks';
import {
  setLoader,
  setToInitialLoader
} from '../../../../../redux/loaderSlice';
import { getUser, updateUserImage } from '../../services/UserService';
import { mainNavigate } from '../../../../auth/views/utils/Utils';
import { setSnackBar } from '../../../../../redux/snackBarSlice';
import { MessageType } from '../../../../../models/enums/MessageTypeEnum';
import { setModal } from '../../../../../redux/modalSlice';
import {
  getCurrentUser,
  setCurrentUser
} from '../../../../auth/services/AuthService';
import GeneralInfo from './general/info/GeneralInfo';
import GeneralPassword from './general/password/GeneralPassword';
import { IMode } from '../../../../../models/enums/Base';

const Profile = () => {
  const [modeInfo, setModeInfo] = useState<IMode>(IMode.PREVIEW);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userAuth = getCurrentUser();
  const [user, setUser] = useState<IUser>({
    firstName: '',
    lastName: '',
    token: null,
    password: null,
    image: null,
    email: '',
    phoneNumber: '',
    roles: [],
    id: 0
  });

  const fetchUser = useCallback(() => {
    if (userAuth) {
      dispatch(setLoader(true));
      getUser(userAuth.id)
        .then((data) => {
          setUser(data);
          setCurrentUser(data, dispatch);
          dispatch(setToInitialLoader());
        })
        .catch((e) => {
          console.error(e);
          navigate(mainNavigate);
          dispatch(setToInitialLoader());
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserImage = useCallback(
    (image: string) => {
      if (userAuth) {
        dispatch(setLoader(true));
        updateUserImage(userAuth.id, image)
          .then(() => {
            void fetchUser();
            dispatch(setToInitialLoader());
            dispatch(
              setSnackBar({
                open: true,
                message: 'Foto de perfil atualizada com sucesso!',
                type: MessageType.SUCCESS
              })
            );
          })
          .catch((e) => {
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
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    void fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modeInfo]);

  return (
    <>
      {user.id && (
        <div className="flex w-full flex-col gap-5">
          <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid-cols-12">
            <Banner
              {...{ fetchUserImage }}
              image={user.image}
              name={`${user.firstName} ${user.lastName}`}
              role={user.roles[0]?.name ?? ''}
            />

            <div>
              <GeneralInfo {...{ user, modeInfo, setModeInfo }} />
              <GeneralPassword {...{ user }} />
            </div>
          </div>
        </div>
      )}
      {/*  <div className="flex w-full flex-col gap-5">
        <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
          <div className="col-span-4 lg:!mb-0">
            <Banner />
          </div>

          <div className="col-span-3 lg:!mb-0">
            <Storage />
          </div>

          <div className="z-0 col-span-5 lg:!mb-0">
            <Upload />
          </div>
        </div>

        <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
          <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-4">
            <Project />
          </div>
          <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
            <General />
          </div>

          <div className="col-span-5 lg:col-span-12 lg:mb-0 3xl:!col-span-3">
            <Notification />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Profile;
