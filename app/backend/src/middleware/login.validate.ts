import { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const validatePayload = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const checkEmail = regex.test(email);

  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All fields must be filled' });
  }
  if (!checkEmail) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Incorrect email or password' });
  }
  if (password.length <= 6) {
    return res.status(StatusCodes.BAD_REQUEST).json(
      { message: 'Password must be longer than 6 characters' },
    );
  }
  if (email === '' || password === '') {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All fields must be filled' });
  }

  next();
};

export default validatePayload;
