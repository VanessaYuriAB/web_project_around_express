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

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const userId = users.find((user) => user._id === id);
  if (!userId) {
    res.status(404).send({ message: 'ID do usuário não encontrado' });
    return;
  }
  res.send(userId);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
