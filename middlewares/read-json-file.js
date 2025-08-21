const fs = require('fs');

const readJsonFileMiddleware = (filePath) => (req, res, next) => {
  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      res.status(500).send({ message: 'Ocorreu um erro no servidor ao ler o arquivo JSON' });
      return;
    }
    try {
      req.data = JSON.parse(data);
      if (req.data) {
        if (filePath.includes('users.json')) {
          req.users = req.data;
        }
        if (filePath.includes('cards.json')) {
          req.cards = req.data;
        }
      }
      next();
    } catch (parseError) {
      res.status(500).send({ message: 'Ocorreu um erro no servidor ao processar os dados JSON' });
    }
  });
};

module.exports = readJsonFileMiddleware;
