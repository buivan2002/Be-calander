'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Hàm UP: Chạy khi bạn gõ lệnh db:migrate
  async up(queryInterface, Sequelize) {
    // Lưu ý: Thay chữ 'Users' bằng đúng Tên Bảng của bạn trong Database (thường là số nhiều)
    await queryInterface.changeColumn('Calendars', 'team_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // Đổi cột thành cho phép NULL
    });
  },

  // Hàm DOWN: Chạy khi bạn gõ lệnh db:migrate:undo (để hoàn tác)
  async down(queryInterface, Sequelize) {
    // Trả lại hiện trạng cũ: Bắt buộc phải có dữ liệu (NOT NULL)
    await queryInterface.changeColumn('Calendars', 'team_id', {
      type: Sequelize.INTEGER,
      allowNull: false, 
    });
  }
};