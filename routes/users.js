const users = require('express').Router();
const {getUser, updateUser} = require('../controllers/users');
const {updateUserValidation} = require('../middlewares/bodyValidation');

users.get('/users/me', getUser);
users.patch('/users/me', updateUserValidation, updateUser);

module.exports = users;