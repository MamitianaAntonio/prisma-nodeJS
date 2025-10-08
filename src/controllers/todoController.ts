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
