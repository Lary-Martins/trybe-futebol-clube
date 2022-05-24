import Matches from '../../database/models/Matches';
import { IMatchRequest, ITeamsGoals } from './IMatch';

export interface IMatchesRepository {
  findAllMatches(): Promise <Matches[]>
  createNewMatch(body: IMatchRequest): Promise <Matches>
  updateMatchProgress(id: number): Promise <[number, Matches[]]>
  updateMatchGoals(teamGoals: ITeamsGoals, id: number): Promise<[number, Matches[]]>
}
