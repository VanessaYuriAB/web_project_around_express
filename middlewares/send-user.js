const sendUserMiddleware = (req, res) => {
  res.send(req.user);
};

module.exports = sendUserMiddleware;
