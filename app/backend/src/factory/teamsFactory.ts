import TeamsService from '../services/TeamsService';
import TeamsRepository from '../repositories/TeamsRepository';

const teamsFactory = new TeamsService(new TeamsRepository());

export default teamsFactory;
