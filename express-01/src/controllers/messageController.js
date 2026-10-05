import { messageService } from "../services/index.js";
import { NotFoundError, UnauthorizedError } from "../utils/appError.js";

const getMessages = async (req, res) => {
  const messages = await messageService.getAllMessages();

  return res.status(200).json(messages);
};

const getMessage = async (req, res) => {
  const message = await messageService.getMessageById(req.params.messageId);

  if (!message) {
    throw new NotFoundError("Mensagem não encontrada");
  }

  return res.status(200).json(message);
};

const createMessage = async (req, res) => {
  if (!req.context.me) {
    throw new UnauthorizedError();
  }

  const message = await messageService.createMessage({
    text: req.body.text,
    userId: req.context.me.id,
  });

  return res.status(201).json(message);
};

const updateMessage = async (req, res) => {
  const message = await messageService.updateMessage(
    req.params.messageId,
    req.body,
  );

  if (!message) {
    throw new NotFoundError("Mensagem não encontrada");
  }

  return res.status(200).json(message);
};

const deleteMessage = async (req, res) => {
  const deleted = await messageService.deleteMessage(req.params.messageId);

  if (!deleted) {
    throw new NotFoundError("Mensagem não encontrada");
  }

  return res.status(200).json({
    message: "Mensagem deletada com sucesso",
  });
};

export default {
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
};
