export interface IMatchRequest {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean
}

export interface IMatchResponse extends IMatchRequest {
  id?: number
}

export interface ITeamsGoals {
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean
}
