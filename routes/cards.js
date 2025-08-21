const cardsRouter = require('express').Router();
const path = require('path');

const cardsFilePath = path.join(__dirname, '../data/cards.json');
const readCardsFileMiddleware = require('../middlewares/read-json-file')(cardsFilePath);

const sendCardsMiddleware = require('../middlewares/send-cards');

cardsRouter.get('/', readCardsFileMiddleware, sendCardsMiddleware);

module.exports = cardsRouter;
