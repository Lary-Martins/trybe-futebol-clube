import { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const validadeMatchBody = (
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

export const validadeTeamGoals = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { awayTeamGoals, homeTeamGoals } = req.body;

  if (Number.isNaN(awayTeamGoals) || Number.isNaN(homeTeamGoals)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        message: 'Properties must be of type number',
      });
  }

  next();
};
