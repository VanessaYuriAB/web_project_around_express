const express = require('express');

const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();
const { PORT = 3000 } = process.env;

// ------------------------
// Middlewares
// ------------------------

// Middleware para registrar detalhes de cada requisição
app.use((req, res, next) => {
  const { method, url } = req;
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${method} ${url}`);

  const start = Date.now();

  // Quando a resposta terminar
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${res.statusCode} - ${duration}ms`);
  });

  next();
});

// Middleware para analisar o corpo das requisições como JSON
app.use(express.json());

// Middleware para simular um usuário autenticado
app.use((req, res, next) => {
  req.user = {
    _id: '68c0361b88bffda4db2a681a', // _id do usuário teste criado via Postman
  };

  next();
});

// ------------------------
// Rotas
// ------------------------

// Rota que define o prefixo /users
app.use('/users', usersRouter);
// Rota que define o prefixo /cards
app.use('/cards', cardsRouter);

// Middleware para erros 404 - rotas não encontradas
app.use((req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
});

// ------------------------
// Conexão com MongoDB
// ------------------------

mongoose.connect('mongodb://localhost:27017/aroundb')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// ------------------------
// Start do servidor
// ------------------------

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
