import { ROLE } from "./enums/Role";

export interface IUser {
  id: number;
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
}

export interface IUserUpdate {
  id?: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phoneNumber: string | null;
  role: string | null;
  imageUrl:string | null;
  password: string | null;
  token: string | null;
}