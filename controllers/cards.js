const Card = require('../models/card');

// Importação das constantes para os tipos de erros
const {
  BAD_REQUEST_VALIDATION, BAD_REQUEST_CAST, NOT_FOUND, INTERNAL_SERVER,
} = require('./users');

// O manipulador de solicitação getCards
module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({})
      .orFail(() => {
        const err = new Error(`Erro ao buscar cartões, ${NOT_FOUND.message}: não há cartões cadastrados`);
        err.statusCode = NOT_FOUND.code;
        err.name = NOT_FOUND.name;
        throw err;
      });
    res.send({ data: cards });
  } catch (err) {
    // Erro inesperado, por exemplo, na conexão com o banco de dados
    if (!err.statusCode) {
      err.statusCode = INTERNAL_SERVER.code;
      err.name = INTERNAL_SERVER.name;
      err.message = INTERNAL_SERVER.message;
    }

    res.status(err.statusCode).send({
      message: `${err.message}, ${err.name}`,
    });
  }
};

// O manipulador de solicitação createCard
module.exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    // O campo owner do cartão será o _id do usuário que está criando o cartão
    // Temporariamente, _id é acessível aqui, pelo middleware adicionado em app.js
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(201).send({ data: card });
  } catch (err) {
    if (err.name === BAD_REQUEST_VALIDATION.name) {
      err.statusCode = BAD_REQUEST_VALIDATION.code;
      err.message = `Erro ao criar cartão, ${BAD_REQUEST_VALIDATION.message}`;
    } else if (!err.statusCode) {
      err.statusCode = INTERNAL_SERVER.code;
      err.name = INTERNAL_SERVER.name;
      err.message = INTERNAL_SERVER.message;
    }

    res.status(err.statusCode).send({
      message: `${err.message}, ${err.name}`,
    });
  }
};

// O manipulador de solicitação deleteCardById
// Por _id
module.exports.deleteCardById = async (req, res) => {
  try {
    const { cardId } = req.params;
    const cardToDelete = await Card.findByIdAndDelete(cardId)
      .orFail(() => {
        const err = new Error(`Erro ao deletar cartão, ${NOT_FOUND.message}: id inexistente`);
        err.statusCode = NOT_FOUND.code;
        err.name = NOT_FOUND.name;
        throw err;
      });
    res.send({ data: cardToDelete });
  } catch (err) {
    if (err.name === BAD_REQUEST_CAST.name) {
      err.statusCode = BAD_REQUEST_CAST.code;
      err.message = `Erro ao deletar cartão, ${BAD_REQUEST_CAST.message}: id`;
    } else if (!err.statusCode) {
      err.statusCode = INTERNAL_SERVER.code;
      err.name = INTERNAL_SERVER.name;
      err.message = INTERNAL_SERVER.message;
    }

    res.status(err.statusCode).send({
      message: `${err.message}, ${err.name}`,
    });
  }
};
