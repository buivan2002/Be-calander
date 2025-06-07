'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    due_date: DataTypes.DATE,
    is_completed: DataTypes.BOOLEAN
  }, {
    tableName: 'todos' // ✅ chỉ rõ tên bảng trong database nếu không trùng
  });
  return Todo;
};
