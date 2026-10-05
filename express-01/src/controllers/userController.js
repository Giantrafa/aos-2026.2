import { userService } from "../services/index.js";
import { NotFoundError } from "../utils/appError.js";

const getUsers = async (req, res) => {
  const users = await userService.getAllUsers();

  return res.status(200).json(users);
};

const getUser = async (req, res) => {
  const user = await userService.getUserById(req.params.userId);

  if (!user) {
    throw new NotFoundError("Usuário não encontrado");
  }

  return res.status(200).json(user);
};

const createUser = async (req, res) => {
  const user = await userService.createUser(req.body);

  return res.status(201).json(user);
};

const updateUser = async (req, res) => {
  const user = await userService.updateUser(req.params.userId, req.body);

  if (!user) {
    throw new NotFoundError("Usuário não encontrado");
  }

  return res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const deleted = await userService.deleteUser(req.params.userId);

  if (!deleted) {
    throw new NotFoundError("Usuário não encontrado");
  }

  return res.status(204).send();
};

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
