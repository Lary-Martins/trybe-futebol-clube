import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const matchesController = new MatchesController();
const matchesRouter = Router();

matchesRouter.get('/', matchesController.getAllMatches);

export default matchesRouter;
