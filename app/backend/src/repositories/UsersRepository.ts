import { IUserRepository } from '../interfaces/IUsersRepository';
import Users from '../database/models/Users';

class UsersRepository implements IUserRepository {
  private userModel = Users;

  async findByEmail(body: string) {
    try {
      const data = await this.userModel.findOne(
        { where: { email: body } },
      );
      return data;
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }
}

export default UsersRepository;
