import { Request, Response } from 'express';
import { ordenar, ordenarNome } from '../utils/ordenar';
import leaderboardFactory from '../factory/leaderboardFactory';

class LeaderboardsController {
  private leaderboardService = leaderboardFactory;

  constructor() {
    this.getLeaderboardHome = this.getLeaderboardHome.bind(this);
    this.getLeaderboardAway = this.getLeaderboardAway.bind(this);
    this.getLeaderboard = this.getLeaderboard.bind(this);
  }

  async getLeaderboardHome(_req: Request, res: Response) {
    try {
      const response = await this.leaderboardService.getLeadboard('homeTeam');

      res.status(response.code).json(response.data);
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }

  async getLeaderboardAway(_req: Request, res: Response) {
    try {
      const response = await this.leaderboardService.getLeadboard('awayTeam');

      res.status(response.code).json(response.data);
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }

  async getLeaderboard(_req: Request, res: Response) {
    const away = ordenarNome((await this.leaderboardService.getLeadboard('awayTeam')).data);

    const data = ordenarNome((await this.leaderboardService.getLeadboard('homeTeam')).data);

    const response = away.map((team, i) => {
      const sla = { name: team.name,
        totalPoints: team.totalPoints + data[i].totalPoints,
        totalGames: team.totalGames + data[i].totalGames,
        totalVictories: team.totalVictories + data[i].totalVictories,
        totalDraws: team.totalDraws + data[i].totalDraws,
        totalLosses: team.totalLosses + data[i].totalLosses,
        goalsFavor: team.goalsFavor + data[i].goalsFavor,
        goalsOwn: team.goalsOwn + data[i].goalsOwn,
        goalsBalance: team.goalsBalance + data[i].goalsBalance,
        efficiency: +(
          (((team.totalVictories + data[i].totalVictories) * 3
         + (data[i].totalDraws + team.totalDraws))
          / ((team.totalGames + data[i].totalGames) * 3)) * 100).toFixed(2),
      }; return sla;
    }); res.status(200).json(ordenar(response));
  }
}

export default LeaderboardsController;
