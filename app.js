const express = require('express');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.get('/', (req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
});

// Define o prefixo /users
app.use('/users', usersRouter);

// Define o prefixo /cards
app.use('/cards', cardsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
