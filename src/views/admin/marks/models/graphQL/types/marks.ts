/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MarkFilterInput, MarkSortInput } from "./../../../../../../models/graphql-global-types";

// ====================================================
// GraphQL query operation: marks
// ====================================================

export interface marks_marks_nodes {
  __typename: "Mark";
  id: number;
  name: string | null;
}

export interface marks_marks {
  __typename: "MarksConnection";
  totalCount: number;
  /**
   * A flattened list of the nodes.
   */
  nodes: (marks_marks_nodes | null)[] | null;
}

export interface marks {
  marks: marks_marks | null;
}

export interface marksVariables {
  last?: number | null;
  first?: number | null;
  filter?: MarkFilterInput | null;
  order?: MarkSortInput[] | null;
}
