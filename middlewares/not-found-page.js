const notFoundPageMiddleware = (req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
};

module.exports = notFoundPageMiddleware;
