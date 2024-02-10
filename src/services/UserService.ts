import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import { BASE_API_URL } from '../config/variables';
import { removeUser, setUser } from '../redux/userSlice';
import { NavigateFunction } from 'react-router-dom';
import {
  IUserLogin,
  IUserRegistration
} from '../views/auth/models/Auth';
import { setSnackBar } from '../redux/snackBarSlice';
import { MessageType } from '../models/enums/MessageTypeEnum';
import { IUser } from '../views/admin/users/models/User';

class UserService {
  static async registration(
    user: IUserRegistration
  ): Promise<Response | undefined> {
    const endpoint = `${BASE_API_URL}${'api/users/createUser'}`;
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' }
      });

      return response;
    } catch (e) {
      console.error(e);
    }
  }

  static async login(userLogin: IUserLogin): Promise<Response | undefined> {
    const endpoint = `${BASE_API_URL}${'api/users/login'}`;
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(userLogin),
        headers: { 'Content-Type': 'application/json' }
      });

      return response;
    } catch (e) {
      console.error(e);
    }
  }

  static setCurrentUser(
    user: IUser,
    dispatch: ThunkDispatch<
      {
        currentUser: IUser | null;
      },
      undefined,
      AnyAction
    > &
      Dispatch<AnyAction>,
    navigate: NavigateFunction
  ): void {
    dispatch(setUser(user));
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/admin/dashboard');
    dispatch(
      setSnackBar({
        open: true,
        message: `Bem-vindo ${user.userName}`,
        type: MessageType.SUCCESS
      })
    );
  }

  static Logout(
    dispatch: ThunkDispatch<
      {
        currentUser: IUser | null;
      },
      undefined,
      AnyAction
    > &
      Dispatch<AnyAction>,
    navigate: NavigateFunction
  ): void {
    dispatch(removeUser());
    localStorage.removeItem('user');
    navigate('/auth/sign-in');
  }
}

export default UserService;
