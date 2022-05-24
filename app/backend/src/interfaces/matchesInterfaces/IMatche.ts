export interface IMatcheRequest {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean
}

export interface IMatcheResponse extends IMatcheRequest {
  id: number
}

export interface ITeamsGoals {
  homeTeamGoals: number,
  awayTeamGoals: number,
}
