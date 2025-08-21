const sendUsersMiddleware = (req, res) => {
  res.send(req.users);
};

module.exports = sendUsersMiddleware;
