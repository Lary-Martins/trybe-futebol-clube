import Matches from '../database/models/Matches';
import { ITeams } from '../interfaces/teamsInterfaces/ITeams';

export default class Leaderboard {
  private totalVictories = 0;

  private totalDraws = 0;

  private goalsFavor = 0;

  private goalsOwn = 0;

  private meusJogos: {
    goalsFavor: number;
    goalsOwn: number;
  }[];

  constructor(
    private team: ITeams,
    private matches: Matches[],
    private from: 'homeTeam' | 'awayTeam',
  ) {}

  public calcula() {
    this.criaMeusJogos();
    this.countVictories();
    this.countEmpate();
    this.countGoals();
    return this.criaMeuObjeto();
  }

  private criaMeusJogos() {
    this.meusJogos = this.matches
      .filter((match) => !match.inProgress && match[this.from] === this.team.id)
      .map((item) => ({
        goalsFavor: item[this.from === 'homeTeam' ? 'homeTeamGoals' : 'awayTeamGoals'],
        goalsOwn: item[this.from === 'homeTeam' ? 'awayTeamGoals' : 'homeTeamGoals'],
      }));
  }

  private countGoals() {
    this.meusJogos.forEach((time) => {
      this.goalsFavor += time.goalsFavor;
      this.goalsOwn += time.goalsOwn;
    });
  }

  private countEmpate() {
    this.meusJogos.forEach((time) => {
      if (time.goalsFavor === time.goalsOwn) {
        this.totalDraws += 1;
      }
    });
  }

  private countVictories() {
    this.meusJogos.forEach((time) => {
      if (time.goalsFavor > time.goalsOwn) {
        this.totalVictories += 1;
      }
    });
  }

  private criaMeuObjeto() {
    return {
      name: this.team.teamName,
      totalPoints: this.totalVictories * 3 + this.totalDraws,
      totalGames: this.meusJogos.length,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses:
        this.meusJogos.length - this.totalDraws - this.totalVictories,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsFavor - this.goalsOwn,
      efficiency: +(
        ((this.totalVictories * 3 + this.totalDraws)
          / (this.meusJogos.length * 3))
        * 100
      ).toFixed(2),
    };
  }
}
