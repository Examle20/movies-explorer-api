const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');
const auth = require('../middlewares/auth');
const {createUser, login} = require('../controllers/users');
const {signupValidation, signinValidation} = require('../middlewares/bodyValidation');

router.post('/signup', signupValidation, createUser);
router.post('/signin', signinValidation, login);

router.use(auth, users)
router.use(auth, movies)

module.exports = router;