const usersRouter = require('express').Router();

const { getUsers, getUserById, createUser } = require('../controllers/users');

// rotas para usuários
usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.post('/', createUser);

// exporta o roteador de usuários
module.exports = usersRouter;
