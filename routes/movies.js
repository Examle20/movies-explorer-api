const movies = require('express').Router();
const { addMovie, getMovies, deleteMovie } = require('../controllers/movies');
const { addMovieValidation, deleteMovieValidation } = require('../middlewares/bodyValidation');

movies.get('/movies', getMovies);
movies.post('/movies', addMovieValidation, addMovie);
movies.delete('/movies/:movieId', deleteMovieValidation, deleteMovie);

module.exports = movies;
