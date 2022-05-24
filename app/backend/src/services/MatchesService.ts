import { StatusCodes } from 'http-status-codes';
import { IMatchesService } from '../interfaces/matchesInterfaces/IMatchesServices';
import { IMatchesRepository } from '../interfaces/matchesInterfaces/IMatchesRepository';
import { IMatcheRequest } from '../interfaces/matchesInterfaces/IMatche';
import { ITeamsRepository } from '../interfaces/teamsInterfaces/ITeamsRepository';

class MatchesService implements IMatchesService {
  constructor(
    private matchesRepository: IMatchesRepository,
    private teamsRepository: ITeamsRepository,
  ) {}

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
    try {
      const teamHomeExist = await this.teamsRepository.findTeamById(body.homeTeam);
      const teamAwayExist = await this.teamsRepository.findTeamById(body.awayTeam);

      if (!teamAwayExist || !teamHomeExist) {
        return { code: StatusCodes.NOT_FOUND,
          data: { message: 'There is no team with such id!' } };
      }

      const { id } = await this.matchesRepository.createNewMatche(body);

      const newMatche = { id, ...body };
      return { code: StatusCodes.CREATED, data: newMatche };
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }

  async patchProgressMatche(id: number) {
    try {
      const updated = await this.matchesRepository.updateProgressMatche(id);
      if (updated) return { code: StatusCodes.NOT_FOUND, data: { message: 'Matche not found' } };

      return { code: StatusCodes.OK, data: { message: 'Finished' } };
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }
}

export default MatchesService;
