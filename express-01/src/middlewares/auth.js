import { authService, userService } from "../services/index.js";
import { AppError } from "../utils/index.js";

const authMiddleware = async (req, res, next) => {
  const [scheme, token] = (req.headers.authorization || "").split(" ");
  if (scheme !== "Bearer" || !token) {
    throw new AppError("Token de autenticação não informado.", 401);
  }

  const { id } = authService.verifyToken(token);
  const user = await userService.getUserById(id);
  if (!user) {
    throw new AppError("Sessão inválida ou expirada.", 401);
  }

  req.user = user;
  next();
};

export default authMiddleware;
