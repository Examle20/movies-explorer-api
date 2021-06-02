const users = require('express').Router();

users.get('/me')
users.patch('/me')

module.exports = users;