import { Request, Response } from "express";
import prisma from "../prismaClient";

// get all todos
export const getTodos = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id as number;
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
    const userId = (req as any).user.id as number;
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
