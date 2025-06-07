const { Todo } = require("../models");
console.log("Todo model:", Todo); // check nếu là undefined

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.findAll(); // lấy hết todos từ DB
        res.json(todos);
        console.log(todos)
    } catch (error) {
        res.status(500).json({ message: "Lỗi server" });
    }
};

// Thêm công việc mới
exports.createTodo = async (req, res) => {
    try {
        const { title, description, due_date } = req.body;
        if (!title) {
            console.log("Title is missing");
            return res.status(400).json({ error: "Title is required" });
        }
        const todo = await Todo.create({ title, description, due_date });
        console.log("Created todo:", todo.toJSON());
        return res.status(201).json(todo);
    } catch (error) {
        console.error("Create todo error:", error);
        return res.status(500).json({ error: error.message });
    }
};

// Cập nhật công việc theo id
exports.updateTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, due_date, is_completed } = req.body;

        const todo = await Todo.findByPk(id);
        if (!todo) return res.status(404).json({ error: "Todo not found" });

        // Cập nhật các trường nếu có trong body
        if (title !== undefined) todo.title = title;
        if (description !== undefined) todo.description = description;
        if (due_date !== undefined) todo.due_date = due_date;

        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Xoá công việc theo id
exports.deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await Todo.findByPk(id);
        if (!todo) return res.status(404).json({ error: "Todo not found" });

        await todo.destroy();
        res.json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.checkComplete = async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    console.log("xxx", id, completed)
    try {
        const todo = await Todo.findByPk(id);
        console.log("xxx", id, completed, todo)
        if (!todo) return res.status(404).json({ message: "Todo not found" });

        todo.is_completed = completed;
        await todo.save();

        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: "Error updating todo" });
    }
};
