import MatchesService from '../services/MatchesService';
import MatchesRepository from '../repositories/MatchesRepository';
import TeamsRepository from '../repositories/TeamsRepository';

const matchesFactory = new MatchesService(new MatchesRepository(), new TeamsRepository());

export default matchesFactory;
