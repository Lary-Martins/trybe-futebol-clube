import { StatusCodes } from 'http-status-codes';
import { ITeamsService } from '../interfaces/ITeamsService';
import { ITeamsRepository } from '../interfaces/ITeamsRepository';

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
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }
}

export default TeamsService;
