import { Request, Response } from 'express';
import matchesFactory from '../factory/matchesFactory';

class MatchesController {
  private matchesService = matchesFactory;

  constructor() {
    this.getAllMatches = this.getAllMatches.bind(this);
    this.postNewMatche = this.postNewMatche.bind(this);
    this.patchProgressMatche = this.patchProgressMatche.bind(this);
  }

  async getAllMatches(_req: Request, res: Response) {
    try {
      const response = await this.matchesService.getAllMatches();

      res.status(response.code).json(response.data);
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }

  async postNewMatche(req: Request, res: Response) {
    const { awayTeam, homeTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
    try {
      const response = await this.matchesService.postNewMatche({
        awayTeam,
        homeTeam,
        homeTeamGoals,
        awayTeamGoals,
        inProgress,
      });

      res.status(response.code).json(response.data);
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }

  async patchProgressMatche(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const response = await this.matchesService.patchProgressMatche(+id);

      res.status(response.code).json(response.data);
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }
}

export default MatchesController;
