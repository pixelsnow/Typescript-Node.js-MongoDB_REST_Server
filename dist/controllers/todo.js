"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodos = exports.createTodo = void 0;
// RequestHandler is shortcut for {Request, Response, NextFunction}
const todo_1 = require("../models/todo");
const TODOS = [];
const createTodo = (req, res, next) => {
    // Another way to write: const text = req.body.text;
    const text = req.body.text;
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: "Created the todo", createdTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.json({ todos: TODOS });
};
exports.getTodos = getTodos;
