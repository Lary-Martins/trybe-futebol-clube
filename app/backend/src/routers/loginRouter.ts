import { Router } from 'express';
import validateToken from '../middleware/token.validate';
import UsersController from '../controllers/UsersController';
import validatePayload from '../middleware/login.validate';

const usersController = new UsersController();
const loginRoute = Router();

loginRoute.post('/', validatePayload, usersController.login);
loginRoute.get('/validate', validateToken, usersController.loginValidate);

export default loginRoute;
