const Card = require('../models/card');

// o manipulador de solicitação getCards
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: `${err.name}, ${err.message}` }));
};

// o manipulador de solicitação createCard
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  // o campo owner do cartão será o _id do usuário que está criando o cartão
  // temporariamente, _id é acessível aqui, pelo middleware adicionado em app.js
  req.body.owner = req.user._id;

  Card.create({ name, link, owner: req.body.owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => res.status(500).send({ message: `${err.name}, ${err.message}` }));
};

// o manipulador de solicitação deleteCardById
// por _id
module.exports.deleteCardById = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: `${err.name}, ${err.message}` }));
};
