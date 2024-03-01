/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RoleFilterInput, RoleSortInput } from "./../../../../../../models/graphql-global-types";

// ====================================================
// GraphQL query operation: roles
// ====================================================

export interface roles_roles_nodes {
  __typename: "Role";
  id: number;
  name: string | null;
  isDefault: boolean;
}

export interface roles_roles {
  __typename: "RolesConnection";
  totalCount: number;
  /**
   * A flattened list of the nodes.
   */
  nodes: roles_roles_nodes[] | null;
}

export interface roles {
  roles: roles_roles | null;
}

export interface rolesVariables {
  last?: number | null;
  first?: number | null;
  filter?: RoleFilterInput | null;
  order?: RoleSortInput[] | null;
}
