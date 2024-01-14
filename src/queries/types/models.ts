/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ModelFilterInput, ModelSortInput } from "./../../models/graphql-global-types";

// ====================================================
// GraphQL query operation: models
// ====================================================

export interface models_models_nodes_mark {
  __typename: "Mark";
  id: number;
  name: string | null;
}

export interface models_models_nodes {
  __typename: "Model";
  id: number;
  name: string | null;
  markId: number;
  mark: models_models_nodes_mark | null;
}

export interface models_models {
  __typename: "ModelsConnection";
  totalCount: number;
  /**
   * A flattened list of the nodes.
   */
  nodes: (models_models_nodes | null)[] | null;
}

export interface models {
  models: models_models | null;
}

export interface modelsVariables {
  last?: number | null;
  first?: number | null;
  filter?: ModelFilterInput | null;
  order?: ModelSortInput[] | null;
}
