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

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const updatedText = (req.body as { text: string }).text;
  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
  if (todoIndex < 0)
    throw new Error(`Could not find an item with id ${todoId}`);
  TODOS[todoIndex].text = updatedText;
  // TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);
  res.json({ message: "Updated", updatedTodo: TODOS[todoIndex] });
};

export const removeTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
  if (todoIndex < 0)
    throw new Error(`Could not find an item with id ${todoId}`);
  TODOS.splice(todoIndex, 1);
  res.json({ message: "Todo deleted" });
};
