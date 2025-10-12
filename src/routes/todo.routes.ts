import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoByTitle,
  updateTodo,
} from "../controllers/todo.controller.ts";
import authMiddleware from "../middleware/auth.middleware.ts";

const router = Router();

// all routes concerned todos
router.get("/", authMiddleware, getAllTodos);
router.get("/title", authMiddleware, getTodoByTitle);
router.post("/", authMiddleware, createTodo);
router.put("/:id", authMiddleware, updateTodo);
router.delete("/:id", authMiddleware, deleteTodo);

export default router;
