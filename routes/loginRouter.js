const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const account = require('../data/login.json');

router.post('/', (req, res) => {
  const { email, password } = req.body;
  const findAccount = account.find((data) => data.email === email);
  if (findAccount) {
    bcrypt.compare(password, findAccount.password, (err, result) => {
      if (err) throw err;
      if (result) {
        const data = findAccount.id;
        const token = jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn: 300 });
        res.cookie('token_user', token);
        res.send(findAccount);
      } else {
        res.send({ message: 'email/password id wrong!' });
      }
    });
  } else {
    res.send({ message: 'email/password id wrong!' });
  }
});

module.exports = router;
