/* eslint-disable max-lines-per-function */
import { Request, Response } from 'express';
// import ordenar from '../utils/ordenar';
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
    const away = await this.leaderboardService.getLeadboard('awayTeam');
    away.data.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    const { data } = await this.leaderboardService.getLeadboard('homeTeam');
    // eslint-disable-next-line sonarjs/no-identical-functions
    data.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    const response = away.data.map((team, i) => {
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
      };
      return sla;
    });
    response.sort((a, b) => a.goalsOwn - b.goalsOwn)
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalVictories - a.totalVictories)
      .sort((a, b) => b.totalPoints - a.totalPoints);
    res.status(away.code).json(response);
  }
}

export default LeaderboardsController;
