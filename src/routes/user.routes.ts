import { Router } from "express";
import { loginUser, registerUser } from "../services/user.service.ts";

const router = Router();

// Post user using registerUser function on services
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await registerUser(email, password, name);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
});

// post user fucntion to login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
});

export default router;
