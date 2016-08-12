var express = require('express');
var bodyParser= require('body-parser')

var app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.post('/quotes', (req, res) => {
  console.log('Hellooooooooooooooooo!')
  console.log(req.body)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
