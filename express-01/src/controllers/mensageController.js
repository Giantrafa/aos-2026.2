export const getMessages = async (req, res) => {
  try {
    const messages = await req.context.models.Message.findAll();

    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getMessage = async (req, res) => {
  try {
    const message = await req.context.models.Message.findByPk(
      req.params.messageId
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
};

export const createMessage = async (req, res) => {
  try {
    const message = await req.context.models.Message.create({
      text: req.body.text,
      userId: req.context.me.id,
    });

    return res.status(201).json(message);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateMessage = async (req, res) => {
  try {
    const message = await req.context.models.Message.findByPk(
      req.params.messageId
    );

    if (!message) {
      return res.status(404).json({
        message: "Mensagem não encontrada",
      });
    }

    await message.update(req.body);

    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const deleted = await req.context.models.Message.destroy({
      where: {
        id: req.params.messageId,
      },
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Mensagem não encontrada",
      });
    }

    return res.status(200).json({
      message: "Mensagem deletada com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};