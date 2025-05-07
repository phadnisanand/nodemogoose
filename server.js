const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();
// parse if application/json
app.use(bodyParser.json());

// parse application/x-www-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const controllers = require('./controller');
mongoose.connect('mongodb://localhost:27017/notes').then(function () {
  console.log('connected to database');
}).catch(function(error){
  console.log('could not connect to db', error);
  process.exit();
});

app.get('/', function(req, res) {
  res.send('hello');
})

app.post('/create',  function(req, res) {
  controllers.createNote(req,res);
})

app.get('/notes',  function(req, res) {
  controllers.findAllNotes(req,res);
})

app.get('/note/:id',  function(req, res) {
  controllers.findNote(req,res);
})

app.put('/updatenote',  function(req, res) {
  controllers.updateNote(req,res);
})

app.delete('/deleteNote/:id',  function(req, res) {
  controllers.deleteNote(req,res);
})

app.listen(3000, function() {
  console.log('server running');
})
