import { StatusCodes } from 'http-status-codes';
import { ITeams } from './ITeams';

interface ITeamsReturn {
  code: StatusCodes;
  data:
  | ITeams
  | ITeams[]
  | {
    message: string;
  };
}

export interface ITeamsService {
  getAllTeams(): Promise<ITeamsReturn>;
  getTeamsById(id: string): Promise<ITeamsReturn>
}
