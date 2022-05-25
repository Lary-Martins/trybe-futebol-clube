import { StatusCodes } from 'http-status-codes';
import Leaderboard from '../utils/Leaderboard';
import { IMatchesRepository } from '../interfaces/matchesInterfaces/IMatchesRepository';
import { ITeamsRepository } from '../interfaces/teamsInterfaces/ITeamsRepository';

class LeaderboardsService {
  constructor(
    private matchesRepository: IMatchesRepository,
    private teamsRepository: ITeamsRepository,
  ) {}

  async getLeadboard(from: 'homeTeam' | 'awayTeam') {
    try {
      const matches = await this.matchesRepository.findAllMatches();
      const teams = await this.teamsRepository.findAllTeams();

      const leadboardHome = teams.map((team) => {
        const board = new Leaderboard(team, matches, from);
        return board.calcula();
      });

      leadboardHome.sort((a, b) => a.goalsOwn - b.goalsOwn)
        .sort((a, b) => b.goalsFavor - a.goalsFavor)
        .sort((a, b) => b.goalsBalance - a.goalsBalance)
        .sort((a, b) => b.totalVictories - a.totalVictories)
        .sort((a, b) => b.totalPoints - a.totalPoints);

      return { code: StatusCodes.OK, data: leadboardHome };
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }
}

export default LeaderboardsService;
