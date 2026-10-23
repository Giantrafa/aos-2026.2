import jwt from "jsonwebtoken";
import models from "../models/index.js";
import { AppError } from "../utils/index.js";

const TOKEN_EXPIRES_IN = "7d";

const getSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new AppError("JWT_SECRET não configurado no servidor.", 500);
  }
  return secret;
};

const createToken = (user) => {
  return jwt.sign({ id: user.id }, getSecret(), {
    expiresIn: TOKEN_EXPIRES_IN,
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, getSecret());
  } catch {
    throw new AppError("Sessão inválida ou expirada.", 401);
  }
};

const register = async ({ name, email, password }) => {
  const existing = await models.User.findOne({ where: { email } });
  if (existing) {
    throw new AppError("Já existe uma conta com este e-mail.", 409);
  }

  const user = await models.User.create({ name, email, password });
  return { token: createToken(user), user };
};

const login = async ({ email, password }) => {
  const user = await models.User.findOne({ where: { email } });
  if (!user || !(await user.checkPassword(password))) {
    throw new AppError("E-mail ou senha incorretos.", 401);
  }

  return { token: createToken(user), user };
};

export default {
  verifyToken,
  register,
  login,
};
