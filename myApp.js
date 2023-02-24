let express = require('express');
let bodyParser = require('body-parser');
let app = express();
require('dotenv').config();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/public', express.static(__dirname + '/public'));

app.use(function (req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip} `);
  next();
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', function (req, res) {
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json({ message: 'Hello json'.toUpperCase() });
  } else {
    res.json({ message: 'Hello json' });
  }
});

app.get(
  '/now',
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);

app.get('/:word/echo', function (req, res, next) {
  const word = req.params.word;
  res.json({ echo: word });
});

app
  .route('/name')
  .get(function (req, res) {
    const { first, last } = req.query;

    res.json({ name: `${first} ${last}` });
  })
  .post(function (req, res) {
    const { first, last } = req.body;

    res.json({ name: `${first} ${last}` });
  });

module.exports = app;
