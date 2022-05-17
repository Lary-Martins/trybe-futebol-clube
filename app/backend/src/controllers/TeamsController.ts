import { Request, Response } from 'express';
import teamsFactory from '../factory/teamsFactory';

class TeamsController {
  private teamsService = teamsFactory;

  constructor() {
    this.getAllTeams = this.getAllTeams.bind(this);
  }

  async getAllTeams(_req: Request, res: Response) {
    try {
      const response = await this.teamsService.getAllTeams();

      res.status(response.code).json(response.data);
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }
    } catch (err) {
      const message = err as string;
      throw new Error(message);
    }
  }
}

export default TeamsController;
