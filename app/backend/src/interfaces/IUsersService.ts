import { StatusCodes } from 'http-status-codes';
import { IPayloadLogin } from './IPayloadLogin ';
import { IUser } from './IUser';

interface IUserReturn {
  code: StatusCodes,
<<<<<<< HEAD
  data: {
    role?: string | undefined
=======
  data: string | undefined | {
>>>>>>> 29ad169fc568a6ecdea7b9acb935632261c2957d
    message?: string,
    user?: IUser,
    token?: string
  }
}

export interface IUsersService {
  userLogin(payload: IPayloadLogin): Promise<IUserReturn>
  validateLogin(token: string): Promise <IUserReturn>
}
