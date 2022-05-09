import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const usersController = new UsersController();
const loginRoute = Router();

loginRoute.post('/', usersController.login);

export default loginRoute;
