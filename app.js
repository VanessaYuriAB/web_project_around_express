const express = require('express');

const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

// Middleware para analisar o corpo das requisições como JSON
app.use(express.json());

// Middleware para adicionar um objeto user em cada solicitação para simular um usuário autenticado
app.use((req, res, next) => {
  req.user = {
    _id: '68c0361b88bffda4db2a681a', // _id do usuário teste criado via Postman
  };

  next();
});

// Rota que define o prefixo /users
app.use('/users', usersRouter);
// Rota que define o prefixo /cards
app.use('/cards', cardsRouter);

// Middleware para erros 404 - Rota não encontrada
app.use((req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
});

// Conexão com o banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/aroundb');

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
