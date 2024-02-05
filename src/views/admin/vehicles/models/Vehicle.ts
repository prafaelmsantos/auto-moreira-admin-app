import { IModel } from '../../models/models/Model';
import { vehicles_vehicles_nodes } from '../queries/types/vehicles';
import { Fuel, FuelTypeGraphQLConverted } from './enums/FuelEnum';
import {
  Transmission,
  TransmissionGraphQLConverted
} from './enums/TransmissionEnum';

export interface IVehicle {
  id: number;
  modelId: number;
  model: IModel;
  year: number;
  color: string;
  observations?: string;
  mileage: number;
  price: number;
  fuelType: Fuel | null;
  version?: string;
  doors: number;
  transmission: Transmission | null;
  engineSize: number;
  power: number;
  opportunity: boolean;
  sold: boolean;
}

export function convertToVehicle(vehicle: vehicles_vehicles_nodes): IVehicle {
  return {
    id: vehicle.id,
    modelId: vehicle.modelId,
    model: {
      id: vehicle.modelId,
      name: vehicle.model?.name ?? '',
      markId: vehicle.model?.markId ?? 0,
      mark: {
        id: vehicle.model?.markId ?? 0,
        name: vehicle.model?.mark?.name ?? ''
      }
    },
    year: vehicle.year,
    color: vehicle?.color ?? '',
    observations: vehicle?.observations ?? '',
    mileage: vehicle.mileage,
    price: vehicle.price,
    fuelType: FuelTypeGraphQLConverted(vehicle.fuelType),
    version: vehicle.version ?? '',
    doors: vehicle.doors,
    transmission: TransmissionGraphQLConverted(vehicle.transmission),
    engineSize: vehicle.engineSize,
    power: vehicle.power,
    opportunity: vehicle.opportunity,
    sold: vehicle.sold
  };
}

export function convertBoolean(value: boolean): string {
  return value ? 'Sim' : 'Não';
}
