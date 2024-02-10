import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import { BASE_API_URL } from '../../../config/variables';
import { MessageType } from '../../../models/enums/MessageTypeEnum';
import { setSnackBar } from '../../../redux/snackBarSlice';
import { setUser, removeUser } from '../../../redux/userSlice';
import { IUserRegistration, IUserLogin } from '../models/Auth';
import { IUser } from '../../admin/users/models/User';

class AuthService {
  static async Registration(
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

  static async Login(userLogin: IUserLogin): Promise<Response | undefined> {
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
    navigate('/admin');
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
      Dispatch<AnyAction>
  ): void {
    dispatch(removeUser());
    localStorage.removeItem('user');
  }
}

export default AuthService;
