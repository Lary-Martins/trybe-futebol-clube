import { StatusCodes } from 'http-status-codes';
import { IMatchesService } from '../interfaces/matchesInterfaces/IMatchesServices';
import { IMatchesRepository } from '../interfaces/matchesInterfaces/IMatchesRepository';
import { IMatchRequest, ITeamsGoals } from '../interfaces/matchesInterfaces/IMatch';
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

  async postNewMatch(body: IMatchRequest) {
    try {
      const teamHomeExist = await this.teamsRepository.findTeamById(body.homeTeam);
      const teamAwayExist = await this.teamsRepository.findTeamById(body.awayTeam);

      if (!teamAwayExist || !teamHomeExist) {
        return { code: StatusCodes.NOT_FOUND,
          data: { message: 'There is no team with such id!' } };
      }

      const { id } = await this.matchesRepository.createNewMatch(body);
      const newMatche = { id, ...body };

      return { code: StatusCodes.CREATED, data: newMatche };
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }

  async patchMatchProgress(id: number) {
    try {
      const updated = await this.matchesRepository.updateMatchProgress(id);

      if (updated[0] === 0) {
        return { code: StatusCodes.NOT_FOUND,
          data: { message: 'Matche not found' } };
      }

      return { code: StatusCodes.OK, data: { message: 'Finished' } };
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }

  async patchMatchGoals(teamGoals: ITeamsGoals, id: number) {
    try {
      const updated = await this.matchesRepository.updateMatchGoals(teamGoals, id);

      if (updated[0] === 0) {
        return { code: StatusCodes.NOT_FOUND,
          data: { message: 'Matche not found' } };
      }

      return { code: StatusCodes.OK, data: { message: 'Updated score' } };
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }
}

export default MatchesService;
