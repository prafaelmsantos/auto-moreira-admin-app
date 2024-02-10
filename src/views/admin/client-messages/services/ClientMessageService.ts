import { BASE_API_URL } from '../../../../config/variables';
import {
  getData} from '../../../../services/AutoMoreiraService';
import { IClientMessage } from '../models/ClientMessage';


const getClientMessage = async (id: number): Promise<IClientMessage> =>
  await getData<IClientMessage>(`${BASE_API_URL}api/ClientMessages/${id}`);
  
export { getClientMessage };
