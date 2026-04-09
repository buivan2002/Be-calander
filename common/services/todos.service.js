const { Todo } = require("@models");
const ApiError = require("@utils/ApiError");

class TodosService {
  async getTodos() {
    return await Todo.findAll();
  }

  async createTodo({ title, description, due_date }) {
    if (!title) {
      throw new ApiError(400, "Title is required");
    }
    return await Todo.create({ title, description, due_date });
  }

  async updateTodo(id, payload) {
    const todo = await Todo.findByPk(id);
    if (!todo) {
      throw new ApiError(404, "Todo not found");
    }

    if (payload.title !== undefined) todo.title = payload.title;
    if (payload.description !== undefined) todo.description = payload.description;
    if (payload.due_date !== undefined) todo.due_date = payload.due_date;
    if (payload.is_completed !== undefined) todo.is_completed = payload.is_completed;

    await todo.save();
    return todo;
  }

  async deleteTodo(id) {
    const todo = await Todo.findByPk(id);
    if (!todo) {
      throw new ApiError(404, "Todo not found");
    }
    await todo.destroy();
  }

  async checkComplete(id, completed) {
    const todo = await Todo.findByPk(id);
    if (!todo) {
      throw new ApiError(404, "Todo not found");
    }
    todo.is_completed = completed;
    await todo.save();
    return todo;
  }
}

module.exports = new TodosService();
