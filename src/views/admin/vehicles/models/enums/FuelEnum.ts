import { FUEL } from '../../../../../models/graphql-global-types';

export enum Fuel {
  PETROL = 'Petrol',
  DIESEL = 'Diesel',
  HYBRID = 'Hybrid'
}

export function FuelTypeConverted(fuelType: Fuel) {
  return fuelType === Fuel.PETROL
    ? 'Gasolina'
    : fuelType === Fuel.DIESEL
    ? 'Gasóleo'
    : 'Híbrido';
}

export function FuelTypeGraphQLConverted(fuelType: FUEL) {
  return fuelType === FUEL.PETROL
    ? Fuel.PETROL
    : fuelType === FUEL.DIESEL
    ? Fuel.DIESEL
    : Fuel.HYBRID;
}

type IFuel = {
  id: Fuel;
  name: string;
};

export const fuels: IFuel[] = [
  { id: Fuel.PETROL, name: FuelTypeConverted(Fuel.PETROL) },
  { id: Fuel.DIESEL, name: FuelTypeConverted(Fuel.DIESEL) },
  { id: Fuel.HYBRID, name: FuelTypeConverted(Fuel.HYBRID) }
];
