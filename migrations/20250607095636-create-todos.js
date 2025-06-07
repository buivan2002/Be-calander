'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Todos", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      due_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      is_completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Nếu muốn tự động cập nhật updated_at, bạn phải dùng trigger trong PostgreSQL
    // nhưng Sequelize không hỗ trợ nó trực tiếp => cập nhật bằng code khi update Todo.
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Todos");
  },
};
