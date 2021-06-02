const users = require('express').Router();
const {getUser, updateUser} = require('../controllers/users');

users.get('/users/me', getUser);
users.patch('/users/me', updateUser);

module.exports = users;