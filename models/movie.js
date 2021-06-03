const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /(https?):\/\/\S{2,}\.\S{2,}/.test(v);
      },
      message: (props) => `${props.value} Неправильный формат ссылки!`,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /(https?):\/\/\S{2,}\.\S{2,}/.test(v);
      },
      message: (props) => `${props.value} Некорректный адрес ссылки`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /(https?):\/\/\S{2,}\.\S{2,}/.test(v);
      },
      message: (props) => `${props.value} Некорректный адрес ссылки`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
