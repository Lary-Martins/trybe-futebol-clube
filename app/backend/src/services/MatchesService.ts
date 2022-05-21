import { StatusCodes } from 'http-status-codes';
import { IMatchesService } from '../interfaces/matchesInterfaces/IMatchesServices';
import { IMatchesRepository } from '../interfaces/matchesInterfaces/IMatchesRepository';

class MatchesService implements IMatchesService {
  private matchesRepository: IMatchesRepository;

  constructor(repository: IMatchesRepository) {
    this.matchesRepository = repository;
  }

  async getAllMatches() {
    try {
      const matchesData = await this.matchesRepository.findAllMatches();

      return { code: StatusCodes.OK, data: matchesData };
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }
}

export default MatchesService;
