import { ITeamsRepository } from '../interfaces/teamsInterfaces/ITeamsRepository';
import Teams from '../database/models/Teams';

class TeamsRepository implements ITeamsRepository {
  private teamsModel = Teams;

  async findAllTeams() {
    try {
      const data = await this.teamsModel.findAll();
      return data;
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }

  async findTeamById(id: number) {
    try {
      const data = await this.teamsModel.findByPk(id);
      return data;
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }
}

export default TeamsRepository;
