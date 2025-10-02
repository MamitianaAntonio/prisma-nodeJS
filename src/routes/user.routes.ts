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
    const { token, user } = await loginUser(email, password);
    res.json({
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
});

export default router;
