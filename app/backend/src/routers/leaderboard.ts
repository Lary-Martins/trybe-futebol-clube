import { Router } from 'express';
import LeaderboardsController from '../controllers/LeaderboardsController';

const leaderboardRouter = Router();
const leadboardController = new LeaderboardsController();

leaderboardRouter.get('/home', leadboardController.getLeaderboardHome);
leaderboardRouter.get('/away', leadboardController.getLeaderboardAway);

export default leaderboardRouter;
