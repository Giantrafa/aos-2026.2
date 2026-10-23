import { Router } from "express";
import { authController } from "../controllers/index.js";
import { authMiddleware, authLimiter } from "../middlewares/index.js";

const router = Router();

router.post("/register", authLimiter, authController.register);
router.post("/login", authLimiter, authController.login);
router.get("/me", authMiddleware, authController.me);

export default router;
