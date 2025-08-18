const express = require('express');
const users = require('./users.json');
const cards = require('./cards.json');

const { PORT = 3000 } = process.env;

const app = express();

app.get('/', (req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
});

app.get('/users', (req, res) => {
  res.send({ users });
});

app.get('/cards', (req, res) => {
  res.send({ cards });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
