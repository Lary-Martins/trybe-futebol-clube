import { StatusCodes } from 'http-status-codes';
import Matches from '../../database/models/Matches';
import { IMatchRequest, IMatchResponse } from './IMatch';

interface IMatchesReturn {
  code: StatusCodes;
  data:
  | Matches
  | Matches[]
  | IMatchResponse
  | {
    message: string;
  };
}

export interface IMatchesService {
  getAllMatches(): Promise<IMatchesReturn>;
  postNewMatch(body: IMatchRequest): Promise<IMatchesReturn>
  patchMatchProgress(id: number): Promise<IMatchesReturn>
}
