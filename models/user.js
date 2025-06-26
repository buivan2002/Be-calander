'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Team, {
        through: models.UserTeamRole,
        foreignKey: 'user_id',
      });
      User.hasMany(models.Calendar, { foreignKey: 'user_id' });

      User.hasMany(models.UserTeamRole, {
        foreignKey: 'user_id',
      });
    }
  }

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users', // khuyến khích chỉ rõ
    timestamps: true,  // nếu bạn không dùng createdAt/updatedAt
  });

  return User;
};
