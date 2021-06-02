const Movie = require('../models/movie');

module.exports.addMovie = (req, res) => {
  const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId} = req.body;
  Movie.create({ country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId, owner: req.user._id})
    .then((movie) => res.send(movie))
    .catch((err) => {
      res.send(err.message)
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        res.send("Непраильно");
      }
      if (movie.owner._id.toString() === req.user._id) {
        Movie.findByIdAndRemove(movie._id)
          .then(() => res.send({ message: 'Успешно' }))
          .catch((err) => res.send("Непраильно"));
      } else {
        res.send("Непраильно")
      }
    })
    .catch((err) => {
      res.send("Непраильно")
    });
};