const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  BAD_REQUEST_ERROR, MOVIE_NOT_FOUND, SUCCESS, FORBIDDEN_ERROR,
} = require('../utils/constans');

module.exports.addMovie = (req, res, next) => {
  const {
    country, director, duration,
    year, description, image,
    trailer, nameRU, nameEN,
    thumbnail, movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST_ERROR));
      } else {
        next(err);
      }
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MOVIE_NOT_FOUND);
      }
      if (movie.owner._id.toString() === req.user._id) {
        Movie.findByIdAndRemove(movie._id)
          .then(() => res.status(200).send(SUCCESS))
          .catch(next);
      } else {
        throw new ForbiddenError(FORBIDDEN_ERROR);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST_ERROR));
      } else {
        next(err);
      }
    });
};
