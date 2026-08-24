'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Calendars', 'progress_percent', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });

    await queryInterface.addColumn('Calendars', 'estimate_hours', {
      type: Sequelize.DECIMAL(6, 2),
      allowNull: true,
    });

    await queryInterface.addColumn('Calendars', 'actual_hours', {
      type: Sequelize.DECIMAL(6, 2),
      allowNull: false,
      defaultValue: 0,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Calendars', 'actual_hours');
    await queryInterface.removeColumn('Calendars', 'estimate_hours');
    await queryInterface.removeColumn('Calendars', 'progress_percent');
  },
};
