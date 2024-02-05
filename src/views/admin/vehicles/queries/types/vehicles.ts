/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleFilterInput, VehicleSortInput, FUEL, TRANSMISSION } from "./../../../../../models/graphql-global-types";

// ====================================================
// GraphQL query operation: vehicles
// ====================================================

export interface vehicles_vehicles_nodes_model_mark {
  __typename: "Mark";
  id: number;
  name: string | null;
}

export interface vehicles_vehicles_nodes_model {
  __typename: "Model";
  id: number;
  name: string | null;
  markId: number;
  mark: vehicles_vehicles_nodes_model_mark | null;
}

export interface vehicles_vehicles_nodes {
  __typename: "Vehicle";
  id: number;
  modelId: number;
  model: vehicles_vehicles_nodes_model | null;
  year: number;
  color: string | null;
  observations: string | null;
  mileage: number;
  price: number;
  fuelType: FUEL;
  version: string | null;
  doors: number;
  transmission: TRANSMISSION;
  engineSize: number;
  power: number;
  opportunity: boolean;
  sold: boolean;
}

export interface vehicles_vehicles {
  __typename: "VehiclesConnection";
  totalCount: number;
  /**
   * A flattened list of the nodes.
   */
  nodes: (vehicles_vehicles_nodes | null)[] | null;
}

export interface vehicles {
  vehicles: vehicles_vehicles | null;
}

export interface vehiclesVariables {
  last?: number | null;
  first?: number | null;
  filter?: VehicleFilterInput | null;
  order?: VehicleSortInput[] | null;
}
