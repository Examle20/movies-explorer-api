require('dotenv').config();

module.exports = {
  PORT: (process.env.NODE_ENV === 'production') ? process.env.PORT : 3001,
  DB_ADDRESS: (process.env.NODE_ENV === 'production') ? process.env.DB_ADDRESS : 'mongodb://localhost:27017/moviesdb',
  JWT_SECRET: (process.env.NODE_ENV === 'production') ? process.env.JWT_SECRET : 'dev-secret',
};
