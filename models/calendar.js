// models/calendar.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Calendar extends Model {
    static associate(models) {
      Calendar.belongsTo(models.User, { foreignKey: 'user_id' });
      Calendar.belongsTo(models.Team, { foreignKey: 'team_id' });
    }
  }

  Calendar.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    status: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    team_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Calendar',
  });

  return Calendar;
};
