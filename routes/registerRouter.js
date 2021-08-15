const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const fs = require('fs');

const saltRounds = 10;
const account = require('../data/login.json');

router.post('/', (req, res) => {
  const { email, password } = req.body;

  const findDuplicateAccount = account.find((data) => data.email === email);

  if (findDuplicateAccount) {
    res.send({ message: 'email already used' });
    return false;
  }

  bcrypt.hash(password, saltRounds, (err, password) => {
    if (err) throw err;
    account.push({
      id: uuidv4(),
      email,
      password,
    });
    res.send({ message: 'success register' });
    fs.writeFileSync('data/login.json', JSON.stringify(account));
  });
});

module.exports = router;
