import { IMatchesRepository } from '../interfaces/matchesInterfaces/IMatchesRepository';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import {
  IMatcheRequest,
  ITeamsGoals,
} from '../interfaces/matchesInterfaces/IMatche';

class MatchesRepository implements IMatchesRepository {
  private MatchesModel = Matches;

  async findAllMatches() {
    try {
      const data = await this.MatchesModel.findAll({
        include: [
          { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      });
      return data;
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }

  async createNewMatch(body: IMatcheRequest) {
    try {
      const data = await this.MatchesModel.create(body);
      return data;
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }

  async updateMatchProgress(id: number) {
    try {
      const data = await this.MatchesModel.update(
        { inProgress: false },
        { where: { id } },
      );
      return data;
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }

  async updateMatchGoals(teamGoals: ITeamsGoals, id: number) {
    const { homeTeamGoals, awayTeamGoals } = teamGoals;
    try {
      const data = await this.MatchesModel.update(
        { homeTeamGoals, awayTeamGoals },
        { where: { id } },
      );
      return data;
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }
}

export default MatchesRepository;
