import { BASE_API_URL } from "../../../../config/variables";
import { getData, postData, putData } from "../../../../services/AutoMoreiraService";
import { IUser, IUserUpdate } from "../models/User";

const getUser = async (id: number): Promise<IUserUpdate> =>
  await getData<IUserUpdate>(`${BASE_API_URL}api/users/${id}`);

const createUser = async (user: IUser): Promise<IUser> =>
  await postData(`${BASE_API_URL}api/users`, user);

const updateUser= async (user: IUserUpdate): Promise<IUserUpdate> =>
  await putData(`${BASE_API_URL}api/users/${user.id}`, user);

export { getUser, createUser, updateUser };
