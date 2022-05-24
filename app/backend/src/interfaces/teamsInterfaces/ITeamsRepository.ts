import Teams from '../../database/models/Teams';

export interface ITeamsRepository {
  findAllTeams(): Promise <Teams[]>
  findTeamById(id: number): Promise <Teams | null>
}
