const userService = require("../services/userService");

async function createUser(req, res) {
  try {
    const user = await userService.createUser(req.body);

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;

    const user = await userService.updateUser(id, req.body);

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado"
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const user = await userService.deleteUser(id);

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado"
      });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser
};