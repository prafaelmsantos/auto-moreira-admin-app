import { IRole, convertToRole } from '../../roles/models/Role';
import { roles_roles_nodes } from '../../roles/models/graphQL/types/roles';
import { users_users_nodes } from './graphQL/types/users';

export interface IUser {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phoneNumber: string | null;
  image: string | null;
  password: string | null;
  token: string | null;
  roles: IRole[];
}

export function convertToUser(user: users_users_nodes): IUser {
  return {
    id: user.id,
    userName: String(user.userName),
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
