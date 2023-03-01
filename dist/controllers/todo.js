"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
// RequestHandler is shortcut for {Request, Response, NextFunction}
const todoMongo_1 = __importDefault(require("../models/todoMongo"));
const createTodo = async (req, res, next) => {
    // Another way to write: const text = req.body.text;
    try {
        const data = req.body;
        console.log("data", data);
        let todos = await todoMongo_1.default.create(data);
        return res
            .status(200)
            .json({ message: "Created todo item successfully", data: todos });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
    /* const text = (req.body as { text: string }).text;
    const newTodo = new Todo(Math.random().toString(), text);
    TODOS.push(newTodo); */
};
exports.createTodo = createTodo;
const getTodos = async (req, res, next) => {
    try {
        let todos = await todoMongo_1.default.find({});
        return res.status(200).json({ message: "All todos", data: todos });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
    // res.json({ todos: TODOS });
};
exports.getTodos = getTodos;
const updateTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        let todos = await todoMongo_1.default.findByIdAndUpdate(id, req.body, { new: true });
        return res
            .status(200)
            .json({ message: "Updated todo item successfully", data: todos });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
    /* const todoId = req.params.id;
    const updatedText = (req.body as { text: string }).text;
    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0)
      throw new Error(`Could not find an item with id ${todoId}`);
    TODOS[todoIndex].text = updatedText;
    // TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);
    res.json({ message: "Updated", updatedTodo: TODOS[todoIndex] }); */
};
exports.updateTodo = updateTodo;
const removeTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        let todos = await todoMongo_1.default.deleteOne({
            _id: id,
        });
        if (todos.deletedCount)
            return res
                .status(200)
                .json({ message: "Removed todo item successfully", data: todos });
        else
            return res.status(200).json({ message: "Didn't remove", data: todos });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
    /* const todoId = req.params.id;
    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0)
      throw new Error(`Could not find an item with id ${todoId}`);
    TODOS.splice(todoIndex, 1);
    res.json({ message: "Todo deleted" }); */
};
exports.removeTodo = removeTodo;
