const cardsRouter = require('express').Router();

const { getCards, createCard, deleteCardById } = require('../controllers/cards');

// rotas para cartões
cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCardById);

// exporta o roteador de cartões
module.exports = cardsRouter;
