import { BASE_API_URL } from '../../../../../config/variables';
import {
  getData,
  postData,
  putData
} from '../../../../../services/AutoMoreiraService';
import { IRole } from '../models/Role';


const getRole = async (id: number): Promise<IRole> =>
  await getData<IRole>(`${BASE_API_URL}api/roles/${id}`);

const createRole = async (role: IRole): Promise<IRole> =>
  await postData(`${BASE_API_URL}api/roles`, role);

const updateRole = async (role: IRole): Promise<IRole> =>
  await putData(`${BASE_API_URL}api/roles/${role.id}`, role);

export { getRole, createRole, updateRole };
