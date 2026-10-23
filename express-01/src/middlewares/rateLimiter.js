import rateLimit from "express-rate-limit";
import { AppError } from "../utils/index.js";

const WINDOW_MS = 15 * 60 * 1000;

const tooManyRequests = (req, res, next) => {
  next(
    new AppError(
      "Muitas requisições originadas deste IP, tente novamente em 15 minutos.",
      429,
    ),
  );
};

const limiter = rateLimit({
  windowMs: WINDOW_MS,
  limit: 1000,
  standardHeaders: false,
  legacyHeaders: false,
  validate: { trustProxy: false },
  handler: tooManyRequests,
});

const authLimiter = rateLimit({
  windowMs: WINDOW_MS,
  limit: 5,
  standardHeaders: false,
  legacyHeaders: false,
  validate: { trustProxy: false },
  handler: tooManyRequests,
});

export { limiter, authLimiter };