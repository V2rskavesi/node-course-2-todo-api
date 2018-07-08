// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

var user = {name: 'Hans',age:25};
var {name} = user;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client) => { //creates new database if doesnt exist
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  };
  console.log('Connected to MondoDB server');
  const db = client.db('TodoApp')
console.log(name);

// db.collection('Todos').find({_id: new ObjectID('5b3cd1f92dbfdd17108028c6')}).toArray().then((docs) => {
//   console.log('Todos');
//   console.log(JSON.stringify(docs, undefined, 2));
// },(err) => {
//   console.log('Unable to fetch todos',err);
// });

// db.collection('Todos').find().count().then((count) => {
//   console.log('Todos count:',count);
// },(err) => {
//   console.log('Unable to fetch todos',err);
// });

db.collection('Users').find({name:'Mike'}).toArray().then((docs) => {
  console.log('User');
  console.log(JSON.stringify(docs, undefined, 2));
},(err) => {
  console.log('Unable to fetch todos',err);
});



//  client.close();
 });
