const sendCardsMiddleware = (req, res) => {
  res.send(req.cards);
};

module.exports = sendCardsMiddleware;
