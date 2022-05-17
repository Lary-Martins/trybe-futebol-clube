import Teams from '../database/models/Teams';

export interface ITeamsRepository {
  findAllTeams(): Promise <Teams[]>
  findTeamById(id: string): Promise <Teams | null>
}
