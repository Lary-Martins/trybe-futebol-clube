import { compare } from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import signUser from '../jwt/tokenGenerate';
import Users from '../database/models/Users';
import { IPayloadLogin } from '../interfaces/IPayloadLogin ';

class UsersService {
  static async userLogin(payload: IPayloadLogin) {
    try {
      const userData = await Users.findOne({ where: { email: payload.email } });
      if (!userData) {
        return { data: { message: 'Incorrect email or password' }, code: StatusCodes.UNAUTHORIZED };
      }
      const validate = await compare(payload.password, userData.password);
      if (!validate) {
        return { data: { message: 'Incorrect email or password' }, code: StatusCodes.UNAUTHORIZED };
      }
      const token = await signUser(payload);
      const response = { user: userData, token };

      return { data: response, code: StatusCodes.OK };
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }
}

export default UsersService;
