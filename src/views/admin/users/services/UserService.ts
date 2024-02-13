import { BASE_API_URL } from "../../../../config/variables";
import { getData, postData, putData } from "../../../../services/AutoMoreiraService";
import { IUser } from "../models/User";

const getUser = async (id: number): Promise<IUser> =>
  await getData<IUser>(`${BASE_API_URL}api/users/${id}`);

const createUser = async (user: IUser): Promise<IUser> =>
  await postData(`${BASE_API_URL}api/users`, user);

const updateUser= async (user: IUser): Promise<IUser> =>
  await putData(`${BASE_API_URL}api/users/${user.id}`, user);

export { getUser, createUser, updateUser };
