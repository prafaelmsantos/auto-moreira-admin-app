import { BASE_API_URL } from '../../../../config/variables';
import {
  getData,
  postData,
  putData
} from '../../../../services/AutoMoreiraService';
import { IVehicle } from '../models/Vehicle';


const getVehicle = async (id: number): Promise<IVehicle> =>
  await getData<IVehicle>(`${BASE_API_URL}api/vehicles/${id}`);

const createVehicle = async (vehicle: IVehicle): Promise<IVehicle> =>
  await postData(`${BASE_API_URL}api/vehicles`, vehicle);

const updateVehicle = async (vehicle: IVehicle): Promise<IVehicle> =>
  await putData(`${BASE_API_URL}api/vehicles/${vehicle.id}`, vehicle);

export { getVehicle, createVehicle, updateVehicle };
