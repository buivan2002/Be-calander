'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    due_date: DataTypes.DATE,
    is_completed: DataTypes.BOOLEAN
  }, {
    tableName: 'Todos', // ✅ chỉ rõ tên bảng trong database nếu không trùng
    timestamps: false,  // tắt luôn timestamps của Sequelize

  });
  return Todo;
};
