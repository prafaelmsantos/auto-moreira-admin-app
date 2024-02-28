/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserFilterInput, UserSortInput } from "./../../../../../../models/graphql-global-types";

// ====================================================
// GraphQL query operation: users
// ====================================================

export interface users_users_nodes_roles {
  __typename: "Role";
  id: number;
  name: string | null;
}

export interface users_users_nodes {
  __typename: "User";
  id: number;
  userName: string | null;
  firstName: string;
  lastName: string;
  image: string | null;
  phoneNumber: string | null;
  email: string | null;
  roles: users_users_nodes_roles[];
}

export interface users_users {
  __typename: "UsersConnection";
  totalCount: number;
  /**
   * A flattened list of the nodes.
   */
  nodes: users_users_nodes[] | null;
}

export interface users {
  users: users_users | null;
}

export interface usersVariables {
  last?: number | null;
  first?: number | null;
  filter?: UserFilterInput | null;
  order?: UserSortInput[] | null;
}
