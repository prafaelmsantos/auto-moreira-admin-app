import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import { BASE_API_URL } from '../../../config/variables';
import { setUser, removeUser } from '../../../redux/userSlice';
import { IUserRegistration, IUserLogin } from '../models/Auth';
import { IUser } from '../../admin/users/models/User';
import {
  getErrorMessage,
  getSessionHeaders,
  postData
} from '../../../services/AutoMoreiraService';
import { setDarkMode } from '../../../redux/darkModeSlice';

const setCurrentUser = (
  user: IUser,
  dispatch: ThunkDispatch<
    {
      currentUser: IUserLogin | null;
    },
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>
) => {
  dispatch(setUser(user));
  dispatch(setDarkMode(!!user.darkMode))
  localStorage.setItem('user', JSON.stringify(user));
};

const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? (JSON.parse(user) as IUser) : null;
};

const logout = (
  dispatch: ThunkDispatch<
    {
      currentUser: IUser | null;
    },
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
  navigate: NavigateFunction
) => {
  dispatch(removeUser());
  localStorage.removeItem('user');
  navigate('/auth/sign-in');
};

const registration = async (
  user: IUserRegistration
): Promise<IUserRegistration> =>
  await postData(`${BASE_API_URL}${'api/users/createUser'}`, user);

  const resetPassword = async (
  email: string
): Promise<string> =>
  await postData(`${BASE_API_URL}${'api/users/resetPassword'}`, email);

const login = async (userLogin: IUserLogin): Promise<IUser> => {
  const response = await fetch(`${BASE_API_URL}${'api/users/login'}`, {
    method: 'POST',
    headers: getSessionHeaders(),
    body: JSON.stringify(userLogin)
  });
  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }
  return (await response.json()) as Promise<IUser>;
};

const setUserDarkMode = async (userId: number, darkMode: boolean): Promise<IUser> => {
  const response = await fetch(`${BASE_API_URL}${'api/users/mode/'}${userId}`, {
    method: 'PUT',
    headers: getSessionHeaders(),
    body: JSON.stringify(darkMode)
  });
  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }
  return (await response.json()) as Promise<IUser>;
};

export { registration, login, setCurrentUser, logout, resetPassword, setUserDarkMode, getCurrentUser};
