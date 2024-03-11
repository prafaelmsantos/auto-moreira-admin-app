import { IRole, convertToRole } from '../../roles/models/Role';
import { roles_roles_nodes } from '../../roles/models/graphQL/types/roles';
import { users_users_nodes } from './graphQL/types/users';

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  image: string | null;
  password: string | null;
  token: string | null;
  roles: IRole[];
  darkMode?: boolean;
}

export interface IUserUpdatePassword {
  email: string;
  password: string;
  confirmPassword: string;
}

export function convertToUser(user: users_users_nodes): IUser {
  return {
    id: user.id,
    firstName: String(user.firstName),
    lastName: String(user.lastName),
    email: String(user.email),
    phoneNumber: String(user.phoneNumber),
    image: String(user.image),
    password: null,
    token: null,
    roles:
      user.roles?.map((role) => convertToRole(role as roles_roles_nodes)) ?? []
  };
}

export enum UserKeys {
  id = 'id',
  name = 'name'
}
