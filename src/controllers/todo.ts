import { RequestHandler } from "express";
// RequestHandler is shortcut for {Request, Response, NextFunction}
import Todo, { TodoModel } from "../models/todoMongo";

export const createTodo: RequestHandler = async (req, res, next) => {
  // Another way to write: const text = req.body.text;
  try {
    const data: TodoModel = req.body;
    console.log("data", data);
    let todos = await Todo.create(data);
    return res
      .status(200)
      .json({ message: "Created todo item successfully", data: todos });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
  /* const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);
  TODOS.push(newTodo); */
};

export const getTodos: RequestHandler = async (req, res, next) => {
  try {
    let todos = await Todo.find({});
    return res.status(200).json({ message: "All todos", data: todos });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
  // res.json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;
    let todos = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    return res
      .status(200)
      .json({ message: "Updated todo item successfully", data: todos });
  } catch (err: any) {
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

export const removeTodo: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;
    let todos = await Todo.deleteOne(id);
    return res
      .status(200)
      .json({ message: "Updated todo item successfully", data: todos });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
  /* const todoId = req.params.id;
  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
  if (todoIndex < 0)
    throw new Error(`Could not find an item with id ${todoId}`);
  TODOS.splice(todoIndex, 1);
  res.json({ message: "Todo deleted" }); */
};
