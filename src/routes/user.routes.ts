import { Router } from "express";
import {
  loginUserController,
  registerUserController,
  updatePasswordController,
  updateUserNameController,
} from "../controllers/user.controller.ts";
import authMiddleware from "../middleware/auth.middleware.ts";

const router = Router();

// all routes concerned user route
router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.put("/update-name", authMiddleware, updateUserNameController);
router.put("/update-password", authMiddleware, updatePasswordController);

export default router;
