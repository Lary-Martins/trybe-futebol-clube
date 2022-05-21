import Matches from '../../database/models/Matches';

export interface IMatchesRepository {
  findAllMatches(): Promise <Matches[]>
}
