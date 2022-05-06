import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const loginRoute = Router();

loginRoute.post('/', UsersController.create);

export default loginRoute;
