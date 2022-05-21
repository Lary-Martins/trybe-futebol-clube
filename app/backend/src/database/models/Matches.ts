import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './Teams';

class Matches extends Model {
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Teams.hasMany(Matches, { foreignKey: 'home_team', as: 'homeMatches' });
Teams.hasMany(Matches, { foreignKey: 'away_team', as: 'awayMatches' });

Matches.belongsTo(
  Teams,
  { foreignKey: 'home_team', as: 'homeTeamId', onDelete: 'CASCADE', onUpdate: 'CASCADE' },
);
Matches.belongsTo(
  Teams,
  { foreignKey: 'away_team', as: 'awayTeamId', onDelete: 'CASCADE', onUpdate: 'CASCADE' },
);

export default Matches;
