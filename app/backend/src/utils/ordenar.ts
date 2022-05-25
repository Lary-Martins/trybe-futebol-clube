interface ILeadboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export const ordenar = (leadboard: ILeadboard[]) => {
  leadboard.sort((a, b) => a.goalsOwn - b.goalsOwn)
    .sort((a, b) => b.goalsFavor - a.goalsFavor)
    .sort((a, b) => b.goalsBalance - a.goalsBalance)
    .sort((a, b) => b.totalVictories - a.totalVictories)
    .sort((a, b) => b.totalPoints - a.totalPoints);
  return leadboard;
};

export const ordenarNome = (leadboard: ILeadboard[]) => {
  leadboard.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    } if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return leadboard;
};
