import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import validatePayload from '../middleware/login.validate';

const usersController = new UsersController();
const loginRoute = Router();

loginRoute.post('/', validatePayload, usersController.login);
loginRoute.get('/validate', usersController.loginValidate);

export default loginRoute;
