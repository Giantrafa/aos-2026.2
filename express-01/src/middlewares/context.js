import models from "../models/index.js";
import { userService } from "../services/index.js";

const contextMiddleware = async (req, res, next) => {
  req.context = {
    models,
    me: await userService.getUserByLogin("rwieruch"),
  };
  next();
};

export default contextMiddleware;
