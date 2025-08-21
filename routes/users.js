const usersRouter = require('express').Router();
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
const readUsersFileMiddleware = require('../middlewares/read-json-file')(usersFilePath);

const sendUsersMiddleware = require('../middlewares/send-users');

const doesUserExistMiddleware = require('../middlewares/does-user-exist');
const sendUserMiddleware = require('../middlewares/send-user');

usersRouter.get('/', readUsersFileMiddleware, sendUsersMiddleware);

usersRouter.get('/:id', readUsersFileMiddleware, doesUserExistMiddleware, sendUserMiddleware);

module.exports = usersRouter;
