import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import { BASE_API_URL } from '../config/variables';
import { IUser, IUserLogin, IUserRegistration } from '../models/identity/User';
import { removeUser, setUser } from '../redux/userSlice';
import { NavigateFunction } from 'react-router-dom';

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
    navigate('/admin');
  }

  static logout(
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
    navigate('/user');
  }
}

export default UserService;
