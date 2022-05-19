import { StatusCodes } from 'http-status-codes';
import { IPayloadLogin } from '../payloadInterfaces/IPayloadLogin ';
import { IUser } from './IUser';

interface IUserReturn {
  code: StatusCodes,
  data: string | {
    message?: string,
    user?: IUser,
    token?: string
  }
}

export interface IUsersService {
  userLogin(payload: IPayloadLogin): Promise<IUserReturn>
  validateLogin(token: string): Promise <IUserReturn>
}
