const movies = require('express').Router();
const {addMovie, getMovies, deleteMovie} = require('../controllers/movies')

movies.get('/movies', getMovies)
movies.post('/movies', addMovie)
movies.delete('/movies/:movieId', deleteMovie)

module.exports = movies;