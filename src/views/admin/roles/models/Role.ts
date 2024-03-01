import { roles_roles_nodes } from "./graphQL/types/roles";

export interface IRole {
    id: number;
    name: string;
    isDefault: boolean;
}

export function convertToRole(role: roles_roles_nodes): IRole {
  return {
    id: role.id,
    name: String(role.name),
    isDefault: role.isDefault
  };
}

export enum RoleKeys {
    id = "id",
    name= "name"
}