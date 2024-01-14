import { Fuel } from './enums/FuelEnum';

export interface ISelectedFilters {
  markId: number | null;
  modelId: number | null;
  fuelType: Fuel | null;
  minYear: number;
  maxYear: number;
  minPrice: number;
  maxPrice: number;
  minKms: number;
  maxKms: number;
}

export const minYear = 2010;
export const maxYear = 2023;
export const minPrice = 10000;
export const maxPrice = 50000;
export const minKms = 0;
export const maxKms = 50000;

export const defaultFilters: ISelectedFilters = {
  markId: null,
  modelId: null,
  fuelType: null,
  minYear: minYear,
  maxYear: maxYear,
  minPrice: minPrice,
  maxPrice: maxPrice,
  minKms: minKms,
  maxKms: maxKms
};
export enum FilterMode {
  HOME,
  VEHICLES
}
