import { userService } from "../services/index.js";
import { NotFoundError } from "../utils/appError.js";

const getSession = async (req, res) => {
  const user = req.context.me
    ? await userService.getUserById(req.context.me.id)
    : null;

  if (!user) {
    throw new NotFoundError("Sessão não encontrada");
  }

  return res.status(200).json(user);
};

export default {
  getSession,
};
