/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ClientMessageFilterInput, ClientMessageSortInput, STATUS } from "./../../../../../../models/graphql-global-types";

// ====================================================
// GraphQL query operation: clientMessages
// ====================================================

export interface clientMessages_clientMessages_nodes {
  __typename: "ClientMessage";
  id: number;
  name: string;
  email: string;
  message: string;
  phoneNumber: any;
  status: STATUS;
  createdDate: any;
}

export interface clientMessages_clientMessages {
  __typename: "ClientMessagesConnection";
  totalCount: number;
  /**
   * A flattened list of the nodes.
   */
  nodes: clientMessages_clientMessages_nodes[] | null;
}

export interface clientMessages {
  clientMessages: clientMessages_clientMessages | null;
}

export interface clientMessagesVariables {
  last?: number | null;
  first?: number | null;
  filter?: ClientMessageFilterInput | null;
  order?: ClientMessageSortInput[] | null;
}
