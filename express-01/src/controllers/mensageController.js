import mensageService from "../services/mensageService.js";

async function updatemenssage(req, res) {
  try {
    const { messageId } = req.params;

    const message = await mensageService.updateMessage(
      messageId,
      req.body
    );

    if (!message) {
      return res.status(404).json({
        message: "Mensagem não encontrada",
      });
    }

    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export default {
  updatemenssage,
};