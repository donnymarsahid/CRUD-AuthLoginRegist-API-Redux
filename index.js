const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(
  cors({
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
    credentials: true,
  })
);

app.use(
  session({
    key: 'userId',
    secret: 'secretSession',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const indexRouter = require('./routes/indexRouter');
const registerRouter = require('./routes/registerRouter');
const loginRouter = require('./routes/loginRouter');
app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

app.listen(PORT, () => {
  console.log(`server is ok PORT : ${PORT}`);
});

module.exports = app;
