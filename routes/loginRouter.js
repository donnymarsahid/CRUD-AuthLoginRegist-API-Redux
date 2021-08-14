const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const dataLogin = require('../data/login.json');

router.post('/', (req, res) => {
  const { email, password } = req.body;

  const findAccount = dataLogin.find((data) => {
    return data.email == email;
  });

  if (findAccount) {
    bcrypt.compare(password, findAccount.password, (err, result) => {
      if (result) {
        const data = findAccount.id;
        const token = jwt.sign({ data }, process.env.JWT_SECRET, {
          expiresIn: 300,
        });
        res.json({ token: token });
      } else {
        res.send('password is wrong');
      }
    });
  } else {
    res.send('email is wrong');
  }
});

module.exports = router;
