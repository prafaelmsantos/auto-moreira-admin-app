import { IUser } from "../views/admin/users/models/User";


export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? (JSON.parse(user) as IUser) : null;
};
