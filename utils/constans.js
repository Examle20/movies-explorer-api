const BAD_REQUEST_ERROR = 'Введены некорректные данные';
const NOT_FOUND_ERROR = 'Ресурс не найден';
const MOVIE_NOT_FOUND = 'Фильм не найден';
const USER_NOT_FOUND = 'Пользователь не существует';
const SUCCESS = 'Успешно';
const FORBIDDEN_ERROR = 'Не достаточно прав';
const MONGO_ERROR = 'Пользователь с таким email уже существует';
const UNAUTHORIZED_ERROR = 'Неправильные почта или пароль';
const AUTHORIZATION_REQUIRED_ERROR = 'Необходима авторизация';
const INCORRECT_LINK_ERROR = 'Некорректный адресс ссылки';
const SERVER_ERROR = 'На сервере произошла ошибка';
const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
};
module.exports = {
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  MOVIE_NOT_FOUND,
  USER_NOT_FOUND,
  SUCCESS,
  FORBIDDEN_ERROR,
  MONGO_ERROR,
  UNAUTHORIZED_ERROR,
  AUTHORIZATION_REQUIRED_ERROR,
  INCORRECT_LINK_ERROR,
  SERVER_ERROR,
  corsOptions
};
