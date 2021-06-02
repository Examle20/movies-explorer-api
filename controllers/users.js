const User = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.send({
      _id: user._id,
      email: user.email,
    }))
    .catch((err) => {
      res.send(err.message)
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res.send('Запрашиваемый пользователь не найден')
      }
      res.send(user);
    })
    .catch((err) => {
      res.send('Запрашиваемый пользователь не найден')
    });
}

module.exports.updateUser = (req, res, next) => {
  const { name, email} = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        res.send('Нету юзера')
      }
      res.send({ data: user });
    })
    .catch((err) => {
      res.send(err.message);
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      console.log(email, password)
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
      res.cookie('jwt', 'Bearer ' + token, {
        maxAge: 3600000,
        httpOnly: true,
      })
        .end();
    })
    .catch((err) => {
      res.send(err.message)
    });
};
