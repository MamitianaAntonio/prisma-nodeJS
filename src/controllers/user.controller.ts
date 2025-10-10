import type { Request, Response } from "express";
import { loginUser, registerUser } from "../services/user.service.ts";

export const registerUserController = async (req : Request, res : Response) => {
  try {
    const { email, password, name } = req.body;
    const user = await registerUser(email, password, name);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}

export const loginUserController = async (req : Request, res : Response) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);
    res.status(200).json({
      message: "Login successfully",
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
}