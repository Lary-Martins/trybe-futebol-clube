import { Request, Response } from 'express';
import leaderboardFactory from '../factory/leaderboardFactory';

class LeaderboardsController {
  private leaderboardService = leaderboardFactory;

  constructor() {
    this.getLeaderboardHome = this.getLeaderboardHome.bind(this);
    this.getLeaderboardAway = this.getLeaderboardAway.bind(this);
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
}

export default LeaderboardsController;
