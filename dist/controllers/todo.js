"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
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
const updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0)
        throw new Error(`Could not find an item with id ${todoId}`);
    TODOS[todoIndex].text = updatedText;
    // TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);
    res.json({ message: "Updated", updatedTodo: TODOS[todoIndex] });
};
exports.updateTodo = updateTodo;
const removeTodo = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0)
        throw new Error(`Could not find an item with id ${todoId}`);
    TODOS.splice(todoIndex, 1);
    res.json({ message: "Todo deleted" });
};
exports.removeTodo = removeTodo;
