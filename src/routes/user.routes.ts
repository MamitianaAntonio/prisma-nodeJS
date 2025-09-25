import { Router } from "express";
import { registerUser } from "../services/user.service";

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

export default router;
