import MatchesService from '../services/MatchesService';
import MatchesRepository from '../repositories/MatchesRepository';

const matchesFactory = new MatchesService(new MatchesRepository());

export default matchesFactory;
