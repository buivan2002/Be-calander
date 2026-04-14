const todosService = require("@services/todos.service");
const catchAsync = require("@utils/catchAsync");

exports.getTodos = catchAsync(async (req, res) => {
  const todos = await todosService.getTodos();
  res.json(todos);
});

exports.createTodo = catchAsync(async (req, res) => {
  const todo = await todosService.createTodo(req.body);
  res.status(201).json(todo);
});

exports.updateTodo = catchAsync(async (req, res) => {
  const todo = await todosService.updateTodo(req.params.id, req.body);
  res.json(todo);
});

exports.deleteTodo = catchAsync(async (req, res) => {
  await todosService.deleteTodo(req.params.id);
  res.json({ message: "Todo deleted successfully" });
});

exports.checkComplete = catchAsync(async (req, res) => {
  const todo = await todosService.checkComplete(req.params.id, req.body.completed);
  res.json(todo);
});
