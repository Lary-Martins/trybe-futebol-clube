import { StatusCodes } from 'http-status-codes';
import { IMatchesService } from '../interfaces/matchesInterfaces/IMatchesServices';
import { IMatchesRepository } from '../interfaces/matchesInterfaces/IMatchesRepository';
import { IMatcheRequest } from '../interfaces/matchesInterfaces/IMatche';

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

  async postNewMatche(body: IMatcheRequest) {
    const matchBody = { inProgress: true, ...body };
    try {
      const { id } = await this.matchesRepository.createNewMatche(matchBody);

      const newMatche = { id, ...body };
      return { code: StatusCodes.OK, data: newMatche };
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }
}

export default MatchesService;
