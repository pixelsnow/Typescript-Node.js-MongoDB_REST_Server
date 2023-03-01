import { RequestHandler } from "express";
// RequestHandler is shortcut for {Request, Response, NextFunction}
import Todo, { TodoModel } from "../models/todoMongo";

export const createTodo: RequestHandler = async (req, res, next) => {
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
};

export const getTodos: RequestHandler = async (req, res, next) => {
  try {
    let todos = await Todo.find({});
    return res.status(200).json({ message: "All todos", data: todos });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
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
};

export const removeTodo: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;
    let todos = await Todo.deleteOne({
      _id: id,
    });
    if (todos.deletedCount)
      return res
        .status(200)
        .json({ message: "Removed todo item successfully", data: todos });
    else return res.status(500).json({ message: "Didn't find a todo with given id", data: todos });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
