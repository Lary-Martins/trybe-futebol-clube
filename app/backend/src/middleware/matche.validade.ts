import { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const validadeMatcheBody = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { awayTeam, homeTeam } = req.body;

  if (awayTeam === homeTeam) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({
        message: 'It is not possible to create a match with two equal teams',
      });
  }

  next();
};
export default validadeMatcheBody;
