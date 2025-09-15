const Card = require('../models/card');

const { handleAsync } = require('./users');

// O manipulador de solicitação getCards
// Erros: Not found, ou Internal server
const getCards = async (req, res) => {
  const cards = await Card.find({}).orFail(() => {
    const err = new Error('Erro ao buscar cartões, Recurso não encontrado: não existem cartões cadastrados');
    err.name = 'NotFoundError';
    throw err;
  });
  res.send({ data: cards });
};

// O manipulador de solicitação createCard
// Erros: Validation ou Internal server
const createCard = async (req, res) => {
  const { name, link } = req.body;
  // O campo owner do cartão será o _id do usuário que está criando o cartão
  // Temporariamente, _id é acessível aqui, pelo middleware adicionado em app.js
  const card = await Card.create({ name, link, owner: req.user._id });
  res.status(201).send({ data: card });
};

// O manipulador de solicitação deleteCardById, por _id
// Erros: Not found, Cast ou Internal server
const deleteCardById = async (req, res) => {
  const { cardId } = req.params;
  const cardToDelete = await Card.findByIdAndDelete(cardId).orFail(() => {
    const err = new Error('Erro ao deletar cartão, Recurso não encontrado: não existe cartão com o id solicitado');
    err.name = 'NotFoundError';
    throw err;
  });
  res.send({ data: cardToDelete });
};

module.exports = {
  getCards: handleAsync(getCards),
  createCard: handleAsync(createCard),
  deleteCardById: handleAsync(deleteCardById),
};
