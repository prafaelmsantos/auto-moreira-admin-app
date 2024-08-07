import { IModel } from '../../vehicle-models/models/Model';
import { Fuel, FuelTypeGraphQLConverted } from './enums/FuelEnum';
import {
  Transmission,
  TransmissionGraphQLConverted
} from './enums/TransmissionEnum';
import { vehicles_vehicles_nodes } from './graphQL/types/vehicles';

export interface IVehicle {
  id: number;
  modelId: number;
  model: IModel;
  year: number;
  color: string | null;
  observations: string | null;
  mileage: number;
  price: number;
  fuelType: Fuel;
  version: string | null;
  doors: number;
  transmission: Transmission;
  engineSize: number;
  power: number;
  opportunity: boolean;
  sold: boolean;
  soldDate?: string | null;
  vehicleImages: IVehicleImage[];
}

export interface IVehicleImage {
  id: number;
  url: string;
  isMain: boolean;
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
    sold: vehicle.sold,
    vehicleImages: vehicle.vehicleImages
  };
}



export enum VehicleKeys {
    id = "id",
    modelMarkId= "model.markId",
    modelId= "modelId",
    version= "version",
    fuelType = "fuelType",
    color="color",
    year= "year",
    price = "price",
    transmission = "transmission",
    mileage = "mileage",
    doors = "doors",
    engineSize = "engineSize",
    power="power",
    observations = "observations",
    sold = "sold",
    opportunity = "opportunity",
    soldDate = "soldDate",
    vehicleImages = "vehicleImages"
}
