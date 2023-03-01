import { RequestHandler } from "express";
// RequestHandler is shortcut for {Request, Response, NextFunction}
import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  // Another way to write: const text = req.body.text;
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);
  TODOS.push(newTodo);
  res.status(201).json({ message: "Created the todo", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};
