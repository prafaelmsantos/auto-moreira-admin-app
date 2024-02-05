import { BASE_API_URL } from '../../../../config/variables';
import {
  getData,
  postData,
  putData
} from '../../../../services/AutoMoreiraService';
import { IModel } from '../models/Model';

const getModel = async (id: number): Promise<IModel> =>
  await getData<IModel>(`${BASE_API_URL}api/models/${id}`);

const createModel = async (model: IModel): Promise<IModel> =>
  await postData(`${BASE_API_URL}api/models`, model);

const updateModel = async (model: IModel): Promise<IModel> =>
  await putData(`${BASE_API_URL}api/models/${model.id}`, model);

export { getModel, createModel, updateModel };
