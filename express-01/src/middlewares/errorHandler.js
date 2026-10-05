import { AppError } from "../utils/appError.js";

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({ message: "Registro já existe" });
  }

  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      message: err.errors.map((e) => e.message).join(", "),
    });
  }

  console.error(err);
  return res.status(500).json({ message: "Erro interno do servidor" });
};

export default errorHandlerMiddleware;
