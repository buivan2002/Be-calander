'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTeamRole extends Model {
    static associate(models) {
      UserTeamRole.belongsTo(models.User, { foreignKey: 'user_id' });
      UserTeamRole.belongsTo(models.Team, { foreignKey: 'team_id' });
      UserTeamRole.belongsTo(models.Role, { foreignKey: 'role_id' });
    }

  }
  UserTeamRole.init({
    user_id: DataTypes.INTEGER,
    team_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserTeamRole',
  });
  return UserTeamRole;
};