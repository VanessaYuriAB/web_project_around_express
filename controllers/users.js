const User = require('../models/user');

// Definição de constantes para os tipos de erros
const BAD_REQUEST_VALIDATION = {
  code: 400,
  name: 'ValidationError',
  message: 'Dado(s) inválido(s) ou inexistente(s)',
};

const BAD_REQUEST_CAST = {
  code: 400,
  name: 'CastError',
  message: 'Dado(s) inválido(s) ou incompleto(s)',
};

const NOT_FOUND = {
  code: 404,
  name: 'NotFoundError',
  message: 'Recurso não encontrado',
};

const INTERNAL_SERVER = {
  code: 500,
  name: 'InternalServerError',
  message: 'Erro interno do servidor',
};

// O manipulador de solicitação getUsers
const getUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .orFail(() => {
        const err = new Error(`Erro ao buscar usuários, ${NOT_FOUND.message}: não há usuários cadastrados`);
        err.statusCode = NOT_FOUND.code;
        err.name = NOT_FOUND.name;
        throw err;
      });
    res.send({ data: users });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = INTERNAL_SERVER.code;
      err.name = INTERNAL_SERVER.name;
      err.message = INTERNAL_SERVER.message;
    }

    res.status(err.statusCode).send({
      message: `${err.message}, ${err.name}`,
    });
  }
};

// O manipulador de solicitação getUserById
const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId)
      .orFail(() => {
        const err = new Error(`Erro ao localizar usuário, ${NOT_FOUND.message}: id inexistente`);
        err.statusCode = NOT_FOUND.code;
        err.name = NOT_FOUND.name;
        throw err;
      });
    res.send({ data: user });
  } catch (err) {
    if (err.name === BAD_REQUEST_CAST.name) {
      err.statusCode = BAD_REQUEST_CAST.code;
      err.message = `Erro ao localizar usuário, ${BAD_REQUEST_CAST.message}: id`;
    } else if (!err.statusCode) {
      err.statusCode = INTERNAL_SERVER.code;
      err.name = INTERNAL_SERVER.name;
      err.message = INTERNAL_SERVER.message;
    }

    res.status(err.statusCode).send({
      message: `${err.message}, ${err.name}`,
    });
  }
};

// O manipulador de solicitação createUser
const createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    res.status(201).send({ data: user });
  } catch (err) {
    if (err.name === BAD_REQUEST_VALIDATION.name) {
      err.statusCode = BAD_REQUEST_VALIDATION.code;
      err.message = `Erro ao criar usuário, ${BAD_REQUEST_VALIDATION.message}`;
    } else if (!err.statusCode) {
      err.statusCode = INTERNAL_SERVER.code;
      err.name = INTERNAL_SERVER.name;
      err.message = INTERNAL_SERVER.message;
    }

    res.status(err.statusCode).send({
      message: `${err.message}, ${err.name}`,
    });
  }
};

module.exports = {
  BAD_REQUEST_VALIDATION,
  BAD_REQUEST_CAST,
  NOT_FOUND,
  INTERNAL_SERVER,
  getUsers,
  getUserById,
  createUser,
};
