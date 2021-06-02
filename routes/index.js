const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');
const auth = require('../middlewares/auth');
const {createUser, login} = require('../controllers/users')

router.post('/signup', createUser)
router.post('/signin', login)

router.use(auth, users)
router.use(auth, movies)

module.exports = router;