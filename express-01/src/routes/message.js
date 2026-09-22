import { Router } from "express";
import {
  getMessages,
  getMessage,
  createMessage,
  deleteMessage,
} from "../controllers/message.js";

const router = Router();

router.get("/", getMessages);

router.get("/:messageId", getMessage);

router.post("/", createMessage);

router.delete("/:messageId", deleteMessage);

export default router;
