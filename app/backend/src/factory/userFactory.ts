import UsersRepository from '../repositories/UsersRepository';
import UsersService from '../services/UsersService';

const userFactory = new UsersService(new UsersRepository());

export default userFactory;
