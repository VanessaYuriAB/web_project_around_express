const User = require('../models/user');

// o manipulador de solicitação getUsers
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: `${err.name}, ${err.message}` }));
};

// o manipulador de solicitação getUserById
module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `${err.name}, ${err.message}` }));
};

// o manipulador de solicitação createUser
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => res.status(500).send({ message: `${err.name}, ${err.message}` }));
};
