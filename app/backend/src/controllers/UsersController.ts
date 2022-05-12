import { Request, Response } from 'express';
import userFactory from '../factory/userFactory';

class UsersController {
  private userService = userFactory;

  constructor() {
    this.login = this.login.bind(this);
    this.loginValidate = this.loginValidate.bind(this);
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const payload = { email, password };

    try {
      const response = await this.userService.userLogin(payload);
      res.status(response.code).json(response.data);
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }

  public async loginValidate(req: Request, res: Response) {
    const { authorization } = req.headers;
    const token = authorization as string;
    try {
      const response = await this.userService.validateLogin(token);
<<<<<<< HEAD
      res.status(response.code).json(response.data.role);
=======
      res.status(response.code).json(response.data);
>>>>>>> 29ad169fc568a6ecdea7b9acb935632261c2957d
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }
}

export default UsersController;
