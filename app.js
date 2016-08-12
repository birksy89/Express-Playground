var express = require('express');
var app = express();

app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.post('/quotes', (req, res) => {
  console.log('Hellooooooooooooooooo!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
