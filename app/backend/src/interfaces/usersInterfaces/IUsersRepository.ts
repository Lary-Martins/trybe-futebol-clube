import { IUserModel } from './IUser';

export interface IUserRepository {
  findByEmail(body: string): Promise<IUserModel | null>
}
