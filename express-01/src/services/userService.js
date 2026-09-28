const { User } = require("../models");

async function createUser(userData) {
  return await User.create(userData);
}

async function updateUser(id, userData) {
  const user = await User.findByPk(id);

  if (!user) {
    return null;
  }

  await user.update(userData);

  return user;
}

async function deleteUser(id) {
  const user = await User.findByPk(id);

  if (!user) {
    return null;
  }

  await user.destroy();

  return user;
}

module.exports = {
  createUser,
  updateUser,
  deleteUser
};