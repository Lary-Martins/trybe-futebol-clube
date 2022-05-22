import { IMatchesRepository } from '../interfaces/matchesInterfaces/IMatchesRepository';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

class MatchesRepository implements IMatchesRepository {
  private MatchesModel = Matches;

  async findAllMatches() {
    try {
      const data = await this.MatchesModel.findAll(
        { include: [
          { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
        ] },
      );
      return data;
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }
}

export default MatchesRepository;
