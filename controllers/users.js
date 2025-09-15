const User = require('../models/user');

// Constantes para os códigos de tipos de erros
const ERROR_CODES = {
  BAD_REQUEST_VALIDATION: 400,
  BAD_REQUEST_CAST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
};

// Função para mapeamento de erros (Mongoose e do servidor)
function mapError(err) {
  // Erros de validação → 400
  if (err.name === 'ValidationError') {
    return {
      statusCode: ERROR_CODES.BAD_REQUEST_VALIDATION,
      name: 'ValidationError',
      message: 'Ocorreu um erro: dado(s) inválido(s) ou inexistente(s) passado(s) ao método',
    };
  }

  // Erros de cast → 400
  if (err.name === 'CastError') {
    return {
      statusCode: ERROR_CODES.BAD_REQUEST_CAST,
      name: 'CastError',
      message: 'Ocorreu um erro: _id inválido ou incompleto passado ao método',
    };
  }

  // Não encontrado (lançado pelo orFail) → 404
  if (err.name === 'NotFoundError') {
    return {
      statusCode: ERROR_CODES.NOT_FOUND,
      name: 'NotFoundError',
      message: err.message || 'Recurso não encontrado',
    };
  }

  // Qualquer outro erro → 500
  return {
    statusCode: ERROR_CODES.INTERNAL_SERVER,
    name: 'InternalServerError',
    message: 'Ocorreu um erro no servidor',
  };
}

// Função para manipulação do envio da resposta de erro em rotas Express
function handleError(res, err) {
  const { statusCode, name, message } = mapError(err);
  res.status(statusCode).send({ message: `${message}, ${name}` });
}

// Função wrapper para controllers assíncronos
function handleAsync(controllerFn) {
  return async (req, res) => {
    try {
      await controllerFn(req, res);
    } catch (err) {
      handleError(res, err);
    }
  };
}

// O manipulador de solicitação getUsers
// Erros: Not found ou Internal Server
const getUsers = async (req, res) => {
  const users = await User.find({}).orFail(() => {
    const err = new Error('Erro ao localizar usuários, Recurso não encontrado: não existem usuários cadastrados');
    err.name = 'NotFoundError';
    throw err;
  });
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
};

module.exports = {
  handleAsync,
  getUsers: handleAsync(getUsers),
  getUserById: handleAsync(getUserById),
  createUser: handleAsync(createUser),
};
