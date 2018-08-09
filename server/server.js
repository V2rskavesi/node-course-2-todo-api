require('./config/config.js')
var _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo'); // use the Todo variable from the object that comes from call to require
var {User} = require('./models/user');
const {ObjectID} = require('mongodb')

var app = express();
const port = process.env.PORT || 'developement';

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
  res.send({todo}) //send the todo 'todo' from the todos 'array', cause thats what comes back from findbyid
},(e) => {
  res.status(400).send()
})

});

app.delete('/todos/:id',(req,res) => {
  id = req.params.id;

  if (!ObjectID.isValid(id)) {  // if ojbectid is not valid, send bad response
    return res.status(404).send();
  };

  Todo.findByIdAndRemove(id).then((todo) => { // these find always return something, so we name it 'todo' and print it
    if(!todo){
    return res.status(404).send();
    }
    res.send({todo});
  },(e) => {
    res.status(400).send();
  });

});

app.patch('/todos/:id',(req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text','completed'])

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  };

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null; //removes value  basically
  }

Todo.findByIdAndUpdate(id, {$set:body}, {new:true}).then((todo) => {
  if (!todo) {
    return res.status(404).send;
  }
  res.send({todo});
}).catch((e) => {
  res.status(400).send();
});
});


app.post('/users/',(req, res) => {
  var body = _.pick(req.body, ['email' ,'password']) //return object with these properties
  var user = new User(body); // we can pass this in cause is the same object you wrote

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user); // x- custom header
  }).catch((e) => {
    res.status(400).send(e);
  })

});

app.listen(port,() => { //callback runs when server is up
  console.log(`Started up at port: ${port}`);
});


module.exports = {app};
