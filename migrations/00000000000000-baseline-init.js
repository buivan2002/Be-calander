'use strict';

/**
 * BASELINE MIGRATION — Generated 2026-04-22
 *
 * ⚠️  QUAN TRỌNG: File này phản ánh trạng thái DB **TRƯỚC** khi 2 migration delta chạy:
 *   - 20260416203000-add-file-and-calendar-relation.js  (đã tạo bảng Files + file_id)
 *   - 20260417065153-make-team-id-nullable.js           (đã đổi team_id → nullable)
 *
 * Do đó baseline này:
 *   - KHÔNG tạo bảng Files (delta migration 20260416... đã lo)
 *   - KHÔNG thêm file_id / assigner_id vào Calendars (idem)
 *   - Khai báo team_id NOT NULL vì đó là trạng thái gốc trước delta 20260417...
 *
 * ĐỂ ĐĂNG KÝ FILE NÀY VÀO DB MÀ KHÔNG CHẠY THỰC SỰ:
 *   Chạy câu SQL bên dưới trong MySQL Workbench / DBeaver / CLI:
 *   INSERT INTO SequelizeMeta (name) VALUES ('20260422000000-00-baseline-init.js');
 *
 * @type {import('sequelize-cli').Migration}
 */
module.exports = {
  // =========================================================================
  // UP: Tạo mới toàn bộ schema từ đầu (thứ tự: cha → con theo FK)
  // =========================================================================
  async up(queryInterface, Sequelize) {
    // -----------------------------------------------------------------
    // 1. Bảng Roles (không có FK, tạo trước)
    // -----------------------------------------------------------------
    await queryInterface.createTable('Roles', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });

    // -----------------------------------------------------------------
    // 2. Bảng Users (không có FK, tạo trước Teams)
    // -----------------------------------------------------------------
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });

    // -----------------------------------------------------------------
    // 3. Bảng Teams (không có FK)
    // -----------------------------------------------------------------
    await queryInterface.createTable('Teams', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });

    // -----------------------------------------------------------------
    // 4. Bảng Todos (không có FK)
    // -----------------------------------------------------------------
    // timestamps: false trong model → KHÔNG có createdAt / updatedAt
    await queryInterface.createTable('Todos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
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
        allowNull: true,
      },
    });

    // -----------------------------------------------------------------
    // 5. Bảng UserTeamRoles (FK → Users, Teams, Roles)
    // -----------------------------------------------------------------
    await queryInterface.createTable('UserTeamRoles', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      team_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Teams', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Roles', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });

    // -----------------------------------------------------------------
    // 6. Bảng Calendars — TRẠNG THÁI GỐC (trước 2 delta migrations)
    //    • assigner_id : CHƯA CÓ (được thêm bởi sync() thủ công → đã tồn tại DB)
    //      → BẮT BUỘC đưa vào đây vì nó đã có trong model hiện tại.
    //    • file_id     : CHƯA CÓ (delta 20260416 thêm sau)
    //    • team_id     : NOT NULL (delta 20260417 đổi thành nullable sau)
    // -----------------------------------------------------------------
    await queryInterface.createTable('Calendars', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      start_time: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      end_time: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      // assigner_id đã tồn tại trong DB (do sync() cũ tạo) — phải có trong baseline
      assigner_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      team_id: {
        // Trạng thái GỐC: NOT NULL — delta 20260417 sẽ đổi thành nullable
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Teams', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      // file_id: KHÔNG có ở đây — delta 20260416 thêm sau
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  // =========================================================================
  // DOWN: Hủy theo thứ tự ngược (con → cha để tránh FK constraint violation)
  // =========================================================================
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Calendars');
    await queryInterface.dropTable('UserTeamRoles');
    await queryInterface.dropTable('Todos');
    await queryInterface.dropTable('Teams');
    await queryInterface.dropTable('Users');
    await queryInterface.dropTable('Roles');
  },
};
