var express = require('express');
var bodyParser = require('body-Parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo'); // use the Todo variable from the object that comes from call to require
var {User} = require('./models/user');
const {ObjectID} = require('mongodb')

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

app.get('/todos',(req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  },(e) => {
    res.status(400).send(e);
  })
});

app.get('/todos/:id',(req, res) => { // if someone sends a get request with /todos/id , this runs
  var id = req.params.id; //this variable gets created in the req due to the colon id

if (!ObjectID.isValid(id)) {  // if ojbectid is not valid, send bad response
  return res.status(404).send()
}

Todo.findById(id).then((todo) => {
  res.send(todo)
},(e) => {
  res.status(400).send()
})

});

app.listen(3000,() => { //callback runs when server is up
  console.log('Started on port 3000');
});


module.exports = {app};
