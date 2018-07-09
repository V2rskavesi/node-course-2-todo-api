// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client) => { //creates new database if doesnt exist
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  };
  console.log('Connected to MondoDB server');
  const db = client.db('TodoApp')

// db.collection('Todos').findOneAndUpdate({
//   _id: new ObjectID("5b43b22b542548b9186ffe20")
// },{
//   $set:{
//     completed: true,
//   }}, {
//     returnOriginal:false
//   }).then((result) => {
//     console.log(result);
//   });


db.collection('Users').findOneAndUpdate({
  _id:new ObjectID("5b43cd86542548b918700188")
},{
  $inc:{
    age:1
  },
  $set:{
    name: "Hans"
  }
}).then((result) => {
  console.log(result);
});



//  client.close();
 });
