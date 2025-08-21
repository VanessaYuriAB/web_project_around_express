const express = require('express');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const notFoundPageMiddleware = require('./middlewares/not-found-page');

const { PORT = 3000 } = process.env;

const app = express();

// Rota que define o prefixo /users
app.use('/users', usersRouter);
// Rota que define o prefixo /cards
app.use('/cards', cardsRouter);

// Middleware para erros 404 - Not Found
app.use(notFoundPageMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
