'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Tạo bảng Files
    await queryInterface.createTable('Files', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      file_path: {
        type: Sequelize.STRING,
        allowNull: false
      },
      file_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // 2. Thêm cột file_id vào bảng Calendars
    await queryInterface.addColumn('Calendars', 'file_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Files',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Khôi phục: xóa cột file_id trước vì nó có khóa ngoại chiếu đến Files
    await queryInterface.removeColumn('Calendars', 'file_id');
    // Xóa bảng Files
    await queryInterface.dropTable('Files');
  }
};
