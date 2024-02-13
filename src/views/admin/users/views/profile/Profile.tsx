import { useCallback, useEffect, useState } from 'react';
import { IUser } from '../../models/User';
import Banner from './banner/Banner';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../../redux/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import {
  setLoader,
  setToInitialLoader
} from '../../../../../redux/loaderSlice';
import { getUser } from '../../services/UserService';
import General from './general/General';
import { IMode } from '../../../../../models/enums/Base';

const Profile = () => {
  const [mode, setMode] = useState<IMode>(IMode.PREVIEW);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const mainNavigate = '/admin/dashboard';
  const userAuth = useSelector((state: RootState) => state.userSlice.user);
  const [user, setUser] = useState<IUser>({
    userName: '',
    firstName: '',
    lastName: '',
    token: null,
    password: null,
    imageUrl: null,
    email: null,
    phoneNumber: null,
    roles: [],
    id: 0
  });

  const fetchUser = useCallback(() => {
    if (userAuth) {
      dispatch(setLoader(true));
      getUser(userAuth.id)
        .then((data) => {
          setUser(data);
          dispatch(setToInitialLoader());
        })
        .catch((e) => {
          console.error(e);
          navigate(mainNavigate);
          dispatch(setToInitialLoader());
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAuth]);

  useEffect(() => {
    void fetchUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, userAuth]);

  return (
    <>
      {user.id && (
        <div className="flex w-full flex-col gap-5">
          <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid-cols-12">
            <div>
              <Banner
                name={`${user.firstName} ${user.lastName}`}
                role={user.roles[0]?.name ?? ''}
              />
            </div>

            <div>
              <General {...{ user, mode, setMode }} />
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
