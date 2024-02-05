/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ClientMessageFilterInput, ClientMessageSortInput } from "./../../../../../models/graphql-global-types";

// ====================================================
// GraphQL query operation: clientMessages
// ====================================================

export interface clientMessages_clientMessages_nodes {
  __typename: "ClientMessage";
  id: number;
  name: string | null;
  email: string | null;
  message: string | null;
  phoneNumber: any;
  dateTime: any;
}

export interface clientMessages_clientMessages {
  __typename: "ClientMessagesConnection";
  totalCount: number;
  /**
   * A flattened list of the nodes.
   */
  nodes: (clientMessages_clientMessages_nodes | null)[] | null;
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
