import { StatusCodes } from 'http-status-codes';
import Matches from '../../database/models/Matches';

interface IMatchesReturn {
  code: StatusCodes;
  data:
  | Matches
  | Matches[]
  | {
    message: string;
  };
}

export interface IMatchesService {
  getAllMatches(): Promise<IMatchesReturn>;
}
