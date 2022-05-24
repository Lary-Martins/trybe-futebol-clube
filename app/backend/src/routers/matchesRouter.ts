import { Router } from 'express';
import validadeMatcheBody from '../middleware/matche.validade';
import MatchesController from '../controllers/MatchesController';

const matchesController = new MatchesController();
const matchesRouter = Router();

matchesRouter.get('/', matchesController.getAllMatches);
matchesRouter.post('/', validadeMatcheBody, matchesController.postNewMatche);

export default matchesRouter;
