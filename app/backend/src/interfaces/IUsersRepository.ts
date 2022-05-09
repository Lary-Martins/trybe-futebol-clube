import { IPayloadLogin } from './IPayloadLogin ';
import { IUser } from './IUser';

export interface IUserRepository {
  findByEmailAndPassword(body: IPayloadLogin): Promise<IUser | null>
}
