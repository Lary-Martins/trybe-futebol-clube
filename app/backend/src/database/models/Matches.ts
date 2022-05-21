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

Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'teamHome' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'teamAway' });

Matches.belongsTo(
  Teams,
  { foreignKey: 'homeTeam', as: 'teamHome', onDelete: 'CASCADE', onUpdate: 'CASCADE' },
);
Matches.belongsTo(
  Teams,
  { foreignKey: 'awayTeam', as: 'teamAway', onDelete: 'CASCADE', onUpdate: 'CASCADE' },
);

export default Matches;
