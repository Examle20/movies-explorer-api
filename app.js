const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./routes');
const handleError = require('./middlewares/handleErorr');
const { limiter } = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsOptions } = require('./utils/constans');
const { PORT, DB_ADDRESS } = require('./utils/configEnv');

const app = express();

app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);
app.use(limiter);

app.use('/', router);

app.use(errorLogger);

app.use(errors());
app.use(handleError);

app.listen(PORT);
