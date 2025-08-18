const usersRouter = require('express').Router();
const users = require('../data/users.json');

usersRouter.get('/', (req, res) => {
  res.send({ users });
});

usersRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const userId = users.find((user) => user._id === id);
  if (!userId) {
    res.status(404).send({ message: 'ID do usuário não encontrado' });
    return;
  }
  res.send(userId);
});

module.exports = usersRouter;
