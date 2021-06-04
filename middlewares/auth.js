const jwt = require('jsonwebtoken');
const { AUTHORIZATION_REQUIRED_ERROR } = require('../utils/constans');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.send(AUTHORIZATION_REQUIRED_ERROR);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    res.send(AUTHORIZATION_REQUIRED_ERROR);
  }
  req.user = payload;
  next();
};
