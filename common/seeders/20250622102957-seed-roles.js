'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [
  {
    id: 1,
    name: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    name: 'manager',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    name: 'member',
    createdAt: new Date(),
    updatedAt: new Date()
  },
], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
