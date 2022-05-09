import { IUserRepository } from '../interfaces/IUsersRepository';
import Users from '../database/models/Users';
import { IPayloadLogin } from '../interfaces/IPayloadLogin ';

class UsersRepository implements IUserRepository {
  private userModel = Users;

  async findByEmailAndPassword(body: IPayloadLogin) {
    try {
      const data = await this.userModel.findOne(
        { where: { email: body.email, password: body.password },
          attributes: ['id', 'username', 'role', 'email'] },
      );
      return data;
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }
}

export default UsersRepository;
