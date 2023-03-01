import { Router } from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  removeTodo,
} from "../controllers/todo";

const router = Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", removeTodo);

export default router;
