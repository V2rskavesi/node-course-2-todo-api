// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');



var user = {name: 'Hans',age:25};
var {name} = user;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client) => { //creates new database if doesnt exist
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  };
  console.log('Connected to MondoDB server');
  const db = client.db('TodoApp')
console.log(name);
  // db.collection('Todos').insertOne({
  //   text: 'something to do',
  //   completed: false
  // },(err, result) => {
  //     if (err) {
  //       return console.log('Unable to insert todo', err);
  //     };
  //     console.log(JSON.stringify(result.ops, undefined, 2));
  // });

//   db.collection('Users').insertOne({
//     name: 'Me',
//     age: 25,
//     location: 'Here'
//
//   },(err,result) => {
//     if (err) {
//       return console.log('Im sorry Michael, im afraid i cant let you do that');
//     };
//     console.log(JSON. stringify(result.ops, undefined, 2));
//     console.log(result.ops[0]._id.getTimestamp());
//   });
//
  client.close();
 });
