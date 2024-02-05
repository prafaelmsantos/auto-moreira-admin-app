import { BASE_API_URL } from '../../../../config/variables';
import {
  getData,
  postData,
  putData
} from '../../../../services/AutoMoreiraService';
import { IMark } from '../models/Mark';

const getMark = async (id: number): Promise<IMark> =>
  await getData<IMark>(`${BASE_API_URL}api/marks/${id}`);

const createMark = async (mark: IMark): Promise<IMark> =>
  await postData(`${BASE_API_URL}api/marks`, mark);

const updateMark = async (mark: IMark): Promise<IMark> =>
  await putData(`${BASE_API_URL}api/marks/${mark.id}`, mark);

export { getMark, createMark, updateMark };
