import type { Request, Response } from "express";
import prisma from "../prismaClient.ts";

// get all todos
export const getTodos = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId as number;
    const todos = await prisma.todo.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.json({ todos });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

// create a new todo
export const createTodo = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId as number;
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const todo = await prisma.todo.create({
      data: { title, userId },
    });

    res.status(201).json({
      message: "Todo is created",
      todo,
    });
  } catch (error) {
    res.status(500).json({ error : "Failed to create todo"});
  }
};

// update todo
export const updateTodo = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId as number;
    const { id } = req.params;
    const { title, completed } = req.body;

    const todo = await prisma.todo.findUnique({
      where: { id: parseInt(id) },
    });

    if (!todo || todo.userId !== userId) {
      return res.status(!todo ? 404 : 403).json({
        error: !todo
          ? "Todo not found"
          : "You are not allowed to modify this todo",
      });
    }

    const updated = await prisma.todo.update({
      where: { id: todo.id },
      data: { title, completed },
    });

    res.json({
      message: "Todo is updated",
      updated,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo." });
  }
};

// delele a todo
export const deleteTodo = async (req : Request, res : Response) => {
  try {
    const userId = (req as any).user.userId as number;
    const { id } = req.params;

    const todo = await prisma.todo.findUnique({
      where : { id : parseInt(id)},
    })
    
    if (!todo || todo.userId !== userId) {
      return res.status(404).json({ error: "Todo not found." });
    }
    
    await prisma.todo.delete({ where : { id : parseInt(id)}})
    res.json({ message : "Todo deleted successfully"})
  } catch (error) {
    res.status(500).json({ error : "Failed to delete todo."})
  }
}