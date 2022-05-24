import { Router } from 'express';
import { validadeMatchBody, validadeTeamGoals } from '../middleware/match.validade';
import MatchesController from '../controllers/MatchesController';

const matchesController = new MatchesController();
const matchesRouter = Router();

matchesRouter.get('/', matchesController.getAllMatches);
matchesRouter.post('/', validadeMatchBody, matchesController.postNewMatch);
matchesRouter.patch('/:id', validadeTeamGoals, matchesController.patchMatchGoals);
matchesRouter.patch('/:id/finish', matchesController.patchMatchProgress);

export default matchesRouter;
