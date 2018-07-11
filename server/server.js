var express = require('express');
var bodyParser = require('body-Parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo'); // use the Todo variable from the object that comes from call to require
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json()); //middleware

app.post('/todos',(req,res) => { //
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  },(e) => {
    res.status(400).send(e);
  });
});

app.listen(3000,() => { //callback runs when server is up
  console.log('Started on port 3000');
});


module.exports = {app};
