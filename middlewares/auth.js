const jwt = require('jsonwebtoken');
const { AUTHORIZATION_REQUIRED_ERROR } = require('../utils/constans');
const { JWT_SECRET } = require('../utils/configEnv');
const UnauthorizedError = require('../errors/UnauthorizedError');
module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(AUTHORIZATION_REQUIRED_ERROR));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError(AUTHORIZATION_REQUIRED_ERROR));
  }
  req.user = payload;
  next();
};
