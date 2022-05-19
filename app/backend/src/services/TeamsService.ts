import { StatusCodes } from 'http-status-codes';
import { ITeamsService } from '../interfaces/teamsInterfaces/ITeamsService';
import { ITeamsRepository } from '../interfaces/teamsInterfaces/ITeamsRepository';

class TeamsService implements ITeamsService {
  private teamsRepository: ITeamsRepository;

  constructor(repository: ITeamsRepository) {
    this.teamsRepository = repository;
  }

  async getAllTeams() {
    try {
      const teamsData = await this.teamsRepository.findAllTeams();

      return { code: StatusCodes.OK, data: teamsData };
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }

  async getTeamsById(id: string) {
    try {
      const teamData = await this.teamsRepository.findTeamById(id);
      if (!teamData) {
        return { code: StatusCodes.NOT_FOUND, data: { message: 'Team not found' } };
      }

      return { code: StatusCodes.OK, data: teamData };
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }

  async getTeamById(id: string) {
    try {
      const teamData = await this.teamsRepository.findTeamById(id);
      if (!teamData) {
        return { code: StatusCodes.NOT_FOUND, data: { message: 'Team not found' } };
      }

      return { code: StatusCodes.OK, data: { team: teamData } };
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }
}

export default TeamsService;
