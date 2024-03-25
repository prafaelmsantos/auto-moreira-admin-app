/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleFilterInput, VehicleSortInput, FUEL, TRANSMISSION } from "./../../../../../../models/graphQL/graphql-global-types";

// ====================================================
// GraphQL query operation: vehicles
// ====================================================

export interface vehicles_vehicles_nodes_model_mark {
  __typename: "Mark";
  id: number;
  name: string;
}

export interface vehicles_vehicles_nodes_model {
  __typename: "Model";
  id: number;
  name: string;
  markId: number;
  mark: vehicles_vehicles_nodes_model_mark;
}

export interface vehicles_vehicles_nodes_vehicleImages {
  __typename: "VehicleImage";
  id: number;
  vehicleId: number;
  url: string;
  isMain: boolean;
}

export interface vehicles_vehicles_nodes {
  __typename: "Vehicle";
  id: number;
  modelId: number;
  model: vehicles_vehicles_nodes_model;
  year: number;
  color: string;
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
  vehicleImages: vehicles_vehicles_nodes_vehicleImages[];
}

export interface vehicles_vehicles {
  __typename: "VehiclesConnection";
  totalCount: number;
  /**
   * A flattened list of the nodes.
   */
  nodes: vehicles_vehicles_nodes[] | null;
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
