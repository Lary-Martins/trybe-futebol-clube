import Teams from '../database/models/Teams';

export interface ITeamsRepository {
  findAllTeams(): Promise <Teams[] | null>
}
