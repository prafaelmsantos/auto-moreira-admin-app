import { roles_roles_nodes } from "./graphQL/types/roles";

export interface IRole {
    id: number;
    name: string;
    isDefault: boolean;
    isReadOnly: boolean;
}

export function convertToRole(role: roles_roles_nodes) {
  return {
    id: role.id,
    name: String(role.name),
    isDefault: role.isDefault
  } as IRole
}

export enum RoleKeys {
    id = "id",
    name= "name"
}