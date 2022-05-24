import Matches from '../../database/models/Matches';
import { IMatcheRequest, ITeamsGoals } from './IMatche';

export interface IMatchesRepository {
  findAllMatches(): Promise <Matches[]>
  createNewMatch(body: IMatcheRequest): Promise <Matches>
  updateMatchProgress(id: number): Promise <[number, Matches[]]>
  updateMatchGoals(teamGoals: ITeamsGoals, id: number): Promise<[number, Matches[]]>
}
