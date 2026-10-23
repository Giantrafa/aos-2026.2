import { authService } from "../services/index.js";
import { AppError } from "../utils/index.js";

const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 72;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeEmail = (email) =>
  typeof email === "string" ? email.trim().toLowerCase() : "";

const register = async (req, res) => {
  const { name, email, password } = req.body || {};

  if (typeof name !== "string" || !name.trim()) {
    throw new AppError("Informe seu nome.", 400);
  }
  if (!EMAIL_REGEX.test(normalizeEmail(email))) {
    throw new AppError("Informe um e-mail válido.", 400);
  }
  if (typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) {
    throw new AppError(
      `A senha precisa ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`,
      400,
    );
  }
  if (password.length > MAX_PASSWORD_LENGTH) {
    throw new AppError(
      `A senha pode ter no máximo ${MAX_PASSWORD_LENGTH} caracteres.`,
      400,
    );
  }

  const session = await authService.register({
    name: name.trim(),
    email: normalizeEmail(email),
    password,
  });
  return res.status(201).send(session);
};

const login = async (req, res) => {
  const { email, password } = req.body || {};

  if (!normalizeEmail(email) || typeof password !== "string" || !password) {
    throw new AppError("Informe o e-mail e a senha.", 400);
  }

  const session = await authService.login({
    email: normalizeEmail(email),
    password,
  });
  return res.status(200).send(session);
};

const me = async (req, res) => {
  return res.status(200).send(req.user);
};

export default {
  register,
  login,
  me,
};
