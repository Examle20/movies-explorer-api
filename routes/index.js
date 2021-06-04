const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');
const auth = require('../middlewares/auth');
const { createUser, login, signOut } = require('../controllers/users');
const { signupValidation, signinValidation } = require('../middlewares/bodyValidation');
const NotFoundError = require('../errors/NotFoundError');
const { NOT_FOUND_ERROR } = require('../utils/constans');

router.post('/signup', signupValidation, createUser);
router.post('/signin', signinValidation, login);
router.post('/signout', signOut);

router.use(auth, users);
router.use(auth, movies);

router.use((req, res, next) => {
  next(new NotFoundError(NOT_FOUND_ERROR));
});
module.exports = router;
