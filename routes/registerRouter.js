const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const dataLogin = require('../data/login.json');
const saltRounds = 10;

router.post('/', (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, saltRounds, (err, password) => {
    if (err) throw err;
    dataLogin.push({
      id: uuidv4(),
      email,
      password,
    });
    res.send({ message: 'register success' });
    fs.writeFileSync('data/login.json', JSON.stringify(dataLogin));
    console.log(dataLogin);
  });
});

module.exports = router;
