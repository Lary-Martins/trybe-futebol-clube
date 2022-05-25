import { Request, Response } from 'express';
import matchesFactory from '../factory/matchesFactory';

class MatchesController {
  private matchesService = matchesFactory;

  constructor() {
    this.getAllMatches = this.getAllMatches.bind(this);
    this.postNewMatch = this.postNewMatch.bind(this);
    this.patchMatchProgress = this.patchMatchProgress.bind(this);
    this.patchMatchGoals = this.patchMatchGoals.bind(this);
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

  async postNewMatch(req: Request, res: Response) {
    const { awayTeam, homeTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
    try {
      const response = await this.matchesService.postNewMatch({
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

  async patchMatchProgress(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const response = await this.matchesService.patchMatchProgress(+id);

      res.status(response.code).json(response.data);
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }

  async patchMatchGoals(req: Request, res: Response) {
    const { authorization } = req.headers;
    const { id } = req.params;
    const { awayTeamGoals, homeTeamGoals, inProgress } = req.body;
    try {
      const response = await this.matchesService.patchMatchGoals(
        { awayTeamGoals, homeTeamGoals, inProgress },
        +id,
        authorization as string,
      );
      res.status(response.code).json(response.data);
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }
}

export default MatchesController;
