import { IVehicle } from '../../models/Vehicle';

export const vehicleListNavigate = '/admin/vehicles';
export const addVehicleNavigate = '/admin/vehicles/add';

const convertWhiteSpaceToNull = (value: string | null): string | null =>
  value?.trim().length === 0 ? null : value;

export const verifyWhiteSpaces = (vehicle: IVehicle): IVehicle => {
  vehicle.version = convertWhiteSpaceToNull(vehicle.version);
  vehicle.color = convertWhiteSpaceToNull(vehicle.color);
  vehicle.observations = convertWhiteSpaceToNull(vehicle.observations);
  return vehicle;
};
