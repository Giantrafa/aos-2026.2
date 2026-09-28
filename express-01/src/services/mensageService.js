import models from "../models/index.js";

const { Message } = models;

async function updateMessage(id, data) {
  const message = await Message.findByPk(id);

  if (!message) {
    return null;
  }

  await message.update(data);

  return message;
}

export default {
  updateMessage,
};