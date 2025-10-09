import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todo.controller";

const router = Router();

router.get("/", authMiddleware, getTodos);
router.post("/", authMiddleware, createTodo);
router.put("/:id", authMiddleware, updateTodo);
router.delete("/:id", authMiddleware, deleteTodo);

export default router;