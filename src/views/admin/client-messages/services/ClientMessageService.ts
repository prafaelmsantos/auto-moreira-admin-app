import { BASE_API_URL } from '../../../../config/variables';
import {
  getData, putData} from '../../../../services/AutoMoreiraService';
import { IClientMessage } from '../models/ClientMessage';
import { Status } from '../models/enums/StatusEnum';


const getClientMessage = async (id: number): Promise<IClientMessage> =>
  await getData<IClientMessage>(`${BASE_API_URL}api/ClientMessages/${id}`);

  const updateClientMessage = async (id: number, status: Status): Promise<Status> =>
  await putData<Status>(`${BASE_API_URL}api/ClientMessages/status/${id}`, status);
  
export { getClientMessage,updateClientMessage };
