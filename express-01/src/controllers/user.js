export const getUsers = async (req, res) => {
  const users = await req.context.models.User.findAll();

  return res.send(users);
};

export const getUser = async (req, res) => {
  const user = await req.context.models.User.findByPk(
    req.params.userId,
  );

  return res.send(user);
};

export const createUser = (req, res) => {
  return res.send("POST HTTP method on user resource");
};

export const updateUser = (req, res) => {
  return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
};

export const deleteUser = (req, res) => {
  return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
};
