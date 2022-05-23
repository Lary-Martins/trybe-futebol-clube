import { StatusCodes } from 'http-status-codes';
import Matches from '../../database/models/Matches';
import { IMatcheRequest, IMatcheResponse } from './IMatche';

interface IMatchesReturn {
  code: StatusCodes;
  data:
  | Matches
  | Matches[]
  | IMatcheResponse
  | {
    message: string;
  };
}

export interface IMatchesService {
  getAllMatches(): Promise<IMatchesReturn>;
  postNewMatche(body: IMatcheRequest): Promise<IMatchesReturn>
}
