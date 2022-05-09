import { StatusCodes } from 'http-status-codes';
import signUser from '../jwt/tokenGenerate';
import { IPayloadLogin } from '../interfaces/IPayloadLogin ';
import { IUserRepository } from '../interfaces/IUsersRepository';
import { IUsersService } from '../interfaces/IUsersService';

class UsersService implements IUsersService {
  private userRepository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.userRepository = repository;
  }

  async userLogin(payload: IPayloadLogin) {
    try {
      const userData = await this.userRepository.findByEmailAndPassword(payload);
      if (!userData) {
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
