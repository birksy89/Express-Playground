var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

//Adding models
Genre = require('./models/genre');
Book = require('./models/book');

//Setting Body Parser - Middleware

app.use(bodyParser.json());


//var MongoClient = require('mongodb').MongoClient

//New way of connecting to Mongo / mongoose
mongoose.connect('mongodb://admin:admin123@ds161295.mlab.com:61295/mongo-bookstore');
var db = mongoose.connection;

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Hey',
        message: 'This is the start of my API'
    });
});

app.get('/api/genres', function(req, res) {

  Genre.getGenres(function(err,genres){
      if(err){
        throw err;
      }
      res.json(genres);
  })

});


//Adding Genre
app.post('/api/genres', function(req, res) {

  var genre = req.body;

  Genre.addGenre(genre,function(err,genre){
      if(err){
        throw err;
      }
      res.json(genre);
  })

});

//Updating Genre
app.put('/api/genres/:_id', function(req, res) {
  var id = req.params._id;
  var genre = req.body;

  Genre.updateGenre(id,genre,{},function(err,genre){
      if(err){
        throw err;
      }
      res.json(genre);
  })

});



app.get('/api/books', function(req, res) {

  Book.getBooks(function(err,books){
      if(err){
        throw err;
      }
      res.json(books);
  })

});


//Add Book
app.post('/api/books', function(req, res) {

  var book = req.body;

  Book.addBook(book,function(err,book){
      if(err){
        throw err;
      }
      res.json(book);
  })

});


app.get('/api/books/:_id', function(req, res) {

  Book.getBookById(req.params._id,function(err,book){
      if(err){
        throw err;
      }
      res.json(book);
  })

});





app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});





app.set('view engine', 'pug');




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

        res.render('list', {
            people: results
        });
    })
});


//Database Connection
// var db;
//
// MongoClient.connect('mongodb://admin:admin123@ds153815.mlab.com:53815/express-playground', (err, database) => {
//     if (err) return console.log(err)
//     db = database
//
//     app.listen(3000, function() {
//         console.log('Example app listening on port 3000!');
//     });
// })
