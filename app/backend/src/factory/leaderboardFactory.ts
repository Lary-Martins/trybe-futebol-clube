import LeaderboardsService from '../services/LeadeboardsService';
import MatchesRepository from '../repositories/MatchesRepository';
import TeamsRepository from '../repositories/TeamsRepository';

const leaderboardFactory = new LeaderboardsService(new MatchesRepository(), new TeamsRepository());

export default leaderboardFactory;
