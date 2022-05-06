import { Request, Response } from 'express';
import UsersService from '../services/UsersService';

class UsersController {
  static async create(req: Request, res: Response) {
    const { email, password } = req.body;
    const payload = { email, password };

    try {
      const response = await UsersService.userLogin(payload);
      res.status(response.code).json(response.data);
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }
}

export default UsersController;
