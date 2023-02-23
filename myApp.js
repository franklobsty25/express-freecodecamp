let express = require('express');
let app = express();
require('dotenv').config();

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', function (req, res) {
  res.json({ message: process.env.MESSAGE_STYLE });
});

module.exports = app;
