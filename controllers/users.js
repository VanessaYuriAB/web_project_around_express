const User = require('../models/user');

const { handleAsync } = require('../utils/utils');

// O manipulador de solicitação getUsers
// Erros: Internal Server
const getUsers = async (req, res) => {
  const users = await User.find({});
  res.send({ data: users });
};

// O manipulador de solicitação getUserById
// Erros: Not found, Cast ou Internal server
const getUserById = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).orFail(() => {
    const err = new Error('Erro ao localizar usuário, Recurso não encontrado: não existe usuário com o id solicitado');
    err.name = 'NotFoundError';
    throw err;
  });
  res.send({ data: user });
};

// O manipulador de solicitação createUser
// Erros: Validation ou Internal server
const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  const user = await User.create({ name, about, avatar });
  res.status(201).send({ data: user });
};

// O manipulador de solicitação updateUser
// Erros: Not found, Validation, Cast ou Internal server
const updateUser = async (req, res) => {
  const { name, about } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  ).orFail(() => {
    const err = new Error('Erro ao atualizar usuário, Recurso não encontrado: não existe usuário com o id solicitado');
    err.name = 'NotFoundError';
    throw err;
  });
  res.send({ data: updatedUser });
};

// O manipulador de solicitação updateAvatar
// Erros: Not found, Validation, Cast ou Internal server
const updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  ).orFail(() => {
    const err = new Error('Erro ao atualizar avatar, Recurso não encontrado: não existe usuário com o id solicitado');
    err.name = 'NotFoundError';
    throw err;
  });
  res.send({ data: updatedUser });
};

module.exports = {
  handleAsync,
  getUsers: handleAsync(getUsers),
  getUserById: handleAsync(getUserById),
  createUser: handleAsync(createUser),
  updateUser: handleAsync(updateUser),
  updateAvatar: handleAsync(updateAvatar),
};
