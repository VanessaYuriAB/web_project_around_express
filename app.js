const express = require('express');

const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const notFoundPageMiddleware = require('./middlewares/not-found-page');

const { PORT = 3000 } = process.env;

const app = express();

// Middleware para analisar o corpo das requisições como JSON
app.use(express.json());

// Rota que define o prefixo /users
app.use('/users', usersRouter);
// Rota que define o prefixo /cards
app.use('/cards', cardsRouter);

// Middleware para erros 404 - Not Found
app.use(notFoundPageMiddleware);

// Conexão com o banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/aroundb');

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
