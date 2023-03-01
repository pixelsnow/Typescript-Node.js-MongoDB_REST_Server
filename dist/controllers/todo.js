"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
// RequestHandler is shortcut for {Request, Response, NextFunction}
const todoMongo_1 = __importDefault(require("../models/todoMongo"));
const createTodo = async (req, res, next) => {
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
            return res.status(500).json({ message: "Didn't find a todo with given id", data: todos });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.removeTodo = removeTodo;
