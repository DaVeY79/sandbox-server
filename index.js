const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello Sandbox!');
});

const registrations = {};
const chats = [];
const locations = [];

app.post('/users', function(req, res) {
  const { username, email, registerNumber, classSem } = req.body;
  if (registrations[username]) {
    res.status(400).json({ error: 'Already registered' });
  }
  registrations[username] = { username, email, registerNumber, classSem };
  res.json({ message: 'Thank you!', username });
});

app.get('/users', function(req, res) {
  res.json(registrations);
});

app.post('/chats', function (req, res) {
  const { username, message } = req.body;
  chats.push({ timestamp: Date.now(), username, message });
  res.json({ message: 'ok' });
});

app.get('/chats', function (req, res) {
  res.json(chats);
});

app.post('/locations', function (req, res) {
  const { username, latitude, longitude, message } = req.body;
  locations.push({ username, latitude, longitude, message });
  res.json({ message: 'ok' });
});

app.get('/locations', function (req, res) {
  res.json(locations);
});

app.listen(3000, function () {
  console.log('Sandbox listening on port 3000!');
});
