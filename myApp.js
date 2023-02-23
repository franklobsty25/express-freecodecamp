let express = require('express');
let app = express();
require('dotenv').config();

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', function (req, res) {
  var style = process.env.MESSAGE_STYLE;
  res.json({ message: style });
});

module.exports = app;
