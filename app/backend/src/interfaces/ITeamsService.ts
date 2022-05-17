import { StatusCodes } from 'http-status-codes';
import { ITeams } from './ITeams';

interface ITeamsReturn {
  code: StatusCodes,
  data: {
    team?: ITeams | ITeams[],
    message?: string,
  }
}

export interface ITeamsService {
  getAllTeams(): Promise <ITeamsReturn>
  getTeamById(id: number): Promise <ITeamsReturn>
}
