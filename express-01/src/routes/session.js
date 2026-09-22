import { Router } from "express";
import { getSession } from "../controllers/session.js";

const router = Router();

router.get("/", getSession);

export default router;
