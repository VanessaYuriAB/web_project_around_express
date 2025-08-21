const doesUserExistMiddleware = (req, res, next) => {
  const { id } = req.params;
  const userId = req.users.find((user) => user._id === id);
  if (!userId) {
    res.status(404).send({ message: 'ID do usuário não encontrado' });
    return;
  }
  req.user = userId;
  next();
};

module.exports = doesUserExistMiddleware;
