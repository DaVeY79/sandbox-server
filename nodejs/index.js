const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello Sandbox!');
});

const registrations = [];
const chats = [];
const locations = [];

app.use(function (req, res, next) {
  console.log(req.method + ' ' + req.originalUrl + ' ' + JSON.stringify(req.body));
  next();
});

app.use('/static', express.static('static'));

app.post('/users', function(req, res) {
  const { username } = req.body;
  registrations.push({ username });
  res.json({ message: 'Thank you ' + username + '!', username });
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

app.listen(process.env.PORT || 5000, function () {
  console.log('sandbox-server is now running');
});
