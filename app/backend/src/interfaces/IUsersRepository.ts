import { IPayloadLogin } from './IPayloadLogin ';
// import { IUser } from './IUser';

export interface IUserRepository {
  create(body: IPayloadLogin): Promise<void>
}
