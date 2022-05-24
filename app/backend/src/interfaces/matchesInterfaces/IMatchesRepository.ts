import Matches from '../../database/models/Matches';
import { IMatcheRequest } from './IMatche';

export interface IMatchesRepository {
  findAllMatches(): Promise <Matches[]>
  createNewMatche(body: IMatcheRequest): Promise <Matches>
  updateProgressMatche(id: number): Promise <[number, Matches[]]>
}
