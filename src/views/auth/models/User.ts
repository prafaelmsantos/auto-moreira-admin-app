import { ROLE } from '../../../models/enums/Role';

export interface IUser {
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
}

export interface IUserRegistration {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IUserLogin {
  userName: string;
  password: string;
}

export interface IUserUpdate {
  id?: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: ROLE;
  description: string;
  imageUrl: string;
  password: string;
  token: string;
}
