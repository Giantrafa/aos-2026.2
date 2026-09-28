import { Router } from "express";

import {
  getMessages,
  getMessage,
  createMessage,
  deleteMessage,
} from "../controllers/message.js";

import mensageController from "../controllers/mensageController.js";

const router = Router();

router.get("/", getMessages);

router.get("/:messageId", getMessage);

router.post("/", createMessage);

router.delete("/:messageId", deleteMessage);

router.put("/:messageId", mensageController.updatemenssage);

export default router;