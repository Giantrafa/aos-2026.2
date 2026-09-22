import models from "../models/index.js";

export default async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin("rwieruch"),
  };

  next();
};
