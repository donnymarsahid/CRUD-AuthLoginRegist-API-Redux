const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

let contacts = require('../data/contacts.json');

router.get('/', (req, res) => {
  res.send(contacts);
});

router.post('/addcontact', (req, res) => {
  const { name, email } = req.body;

  const duplicateContacts = contacts.find((data) => data.email == email);

  if (duplicateContacts) {
    res.send({ message: 'email already use' });
    return false;
  }

  contacts.push({
    id: uuidv4(),
    name,
    email,
  });

  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
});

router.get('/update/:id', (req, res) => {
  const id = req.params.id;
  const findContacts = contacts.find((data) => data.id === id);
  res.send(findContacts);
});

router.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;

  const findContacts = contacts.find((data) => data.id === id);

  if (name) {
    findContacts.name = name;
  }
  if (email) {
    findContacts.email = email;
  }

  res.send({ message: 'success update' });
  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  contacts = contacts.filter((data) => data.id !== id);
  res.send(contacts);
  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
});

module.exports = router;
