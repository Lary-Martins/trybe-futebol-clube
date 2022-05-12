import { StatusCodes } from 'http-status-codes';
<<<<<<< HEAD
import * as bcrypt from 'bcrypt';
import removePassword from '../utils/removePassword';
=======
>>>>>>> 29ad169fc568a6ecdea7b9acb935632261c2957d
import validateToken from '../jwt/tokenValidate';
import signUser from '../jwt/tokenGenerate';
import { IPayloadLogin } from '../interfaces/IPayloadLogin ';
import { IUserRepository } from '../interfaces/IUsersRepository';
import { IUsersService } from '../interfaces/IUsersService';

class UsersService implements IUsersService {
  private userRepository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.userRepository = repository;
    this.validateLogin = this.validateLogin.bind(this);
  }

  async userLogin(payload: IPayloadLogin) {
    try {
      const userData = await this.userRepository.findByEmail(payload.email);
      if (!userData) {
        return { data: { message: 'Incorrect email or password' }, code: StatusCodes.UNAUTHORIZED };
      }

      const verifyPassword = bcrypt.compareSync(payload.password, userData.password);
      if (!verifyPassword) {
        return { data: { message: 'Incorrect email or password' }, code: StatusCodes.UNAUTHORIZED };
      }

      const token = await signUser(payload);
      const newUserData = removePassword(userData);
      const response = { user: newUserData, token };

      return { data: response, code: StatusCodes.OK };
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }

  async validateLogin(token: string) {
    try {
      const validationResponse = await validateToken(token);
      if (validationResponse === false) {
        return { data: { message: 'Expired or invalid token' }, code: StatusCodes.UNAUTHORIZED };
      }
<<<<<<< HEAD
      const userData = await this.userRepository.findByEmail(validationResponse.email);
      return { data: { role: userData?.role }, code: StatusCodes.OK };
=======
      const userData = await this.userRepository.findByEmailAndPassword(validationResponse);
      return { data: userData?.role, code: StatusCodes.OK };
>>>>>>> 29ad169fc568a6ecdea7b9acb935632261c2957d
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }
}

export default UsersService;
