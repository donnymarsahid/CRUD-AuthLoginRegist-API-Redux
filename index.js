const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');

app.use(cors());
app.use(express.json());

const indexRouter = require('./routes/indexRouter');
const loginRouter = require('./routes/loginRouter');
const registerRouter = require('./routes/registerRouter');
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.listen(PORT, () => {
  console.log(`server is ok PORT : ${PORT}`);
});

module.exports = app;
