'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
   static associate(models) {
    Team.belongsToMany(models.User, {
      through: models.UserTeamRole,
      foreignKey: 'team_id',
    });
    Team.hasMany(models.Calendar, { foreignKey: 'team_id' });

    Team.hasMany(models.UserTeamRole, {
      foreignKey: 'team_id',
    });
  }

  }
  Team.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};