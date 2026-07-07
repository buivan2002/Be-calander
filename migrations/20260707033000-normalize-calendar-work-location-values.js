'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      UPDATE Calendars
      SET type = CASE
        WHEN LOWER(type) IN ('low', 'normal', 'hight', 'high') THEN 'home'
        ELSE type
      END
      WHERE type IS NOT NULL
        AND LOWER(type) IN ('low', 'normal', 'hight', 'high');
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`
      UPDATE Calendars
      SET type = 'normal'
      WHERE type = 'home';
    `);
  },
};
