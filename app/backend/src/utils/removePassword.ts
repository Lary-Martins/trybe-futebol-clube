import { IUser, IUserModel } from '../interfaces/IUser';

export default (data: IUserModel): IUser => {
  const newObject = {
    id: data.id,
    email: data.email,
    role: data.role,
    username: data.username,
  };

  return newObject;
};
