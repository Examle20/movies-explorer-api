const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');
const handleError = require('./middlewares/handleErorr');
const { limiter } = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {corsOptions} = require('./utils/constans');
const { PORT = 3000 } = process.env;

const app = express();

app.use(cors(corsOptions));
app.use(helmet());
app.use(limiter);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);

app.use(errors());
app.use(handleError);

app.listen(PORT);
