export const getUsers = async (req, res) => {

  const users = await req.context.models.User.findAll();

  return res.status(200).send(users);

};

export const getUser = async (req, res) => {

  const user = await req.context.models.User.findByPk(
    req.params.userId,
  );

  return res.status(200).send(user);

};

export const createUser = (req, res) => {

  return res
    .status(200)
    .send("POST HTTP method on user resource");

};

export const updateUser = (req, res) => {

  return res
    .status(200)
    .send(`PUT HTTP method on user/${req.params.userId} resource`);

};

export const deleteUser = (req, res) => {

  return res
    .status(200)
    .send(`DELETE HTTP method on user/${req.params.userId} resource`);

};