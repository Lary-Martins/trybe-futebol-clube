import { StatusCodes } from 'http-status-codes';
import { IPayloadLogin } from './IPayloadLogin ';
import { IUser } from './IUser';

interface IUserReturn {
  code: StatusCodes,
  data: {
    message?: string,
    user?: IUser
    token?: string
  }
}
export interface IUsersService {
  userLogin(payload: IPayloadLogin): Promise<IUserReturn>
}
