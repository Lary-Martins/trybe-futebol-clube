import { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const tokenValidate = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Token not sent' });
  }

  next();
};

export default tokenValidate;
