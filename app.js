var express = require('express');
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient




var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}))

app.set('view engine', 'pug');

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Hey',
        message: 'Hello there!'
    });
});

app.post('/quotes', (req, res) => {
    //console.log('Hellooooooooooooooooo!')
    //console.log(req.body)

    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('saved to database')
        res.redirect('/')
    })
})

app.get('/list', function(req, res) {
    //var cursor = db.collection('quotes').find()
    //console.log(cursor);

    db.collection('quotes').find().toArray(function(err, results) {
        console.log(results)
            // send HTML file populated with quotes here

            res.render('list', {people:results});
    })
});


//Database Connection
var db;

MongoClient.connect('mongodb://admin:admin123@ds153815.mlab.com:53815/express-playground', (err, database) => {
    if (err) return console.log(err)
    db = database

    app.listen(3000, function() {
        console.log('Example app listening on port 3000!');
    });
})
