// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client) => { //creates new database if doesnt exist
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  };
  console.log('Connected to MondoDB server');
  const db = client.db('TodoApp')

  // db.collection('Todos').deleteMany({test:"eat lunch"}).then((result) => {
  //   console.log(result);
  // });

  // db.collection('Todos').deleteOne({text:"eat lunch"}).then((result) => {
  //   console.log(result);
  // });

  // db.collection('Todos').findOneAndDelete({completed:false}).then((result) => {
  //   console.log(result);
  // })

  // db.collection('Users').deleteMany({name:"Me"}).then((result) => {
  //   console.log(result);
  // });



  db.collection('Users').findOneAndDelete({_id:new ObjectID("5b43affae0bc3d26582b0b74")}).then((result) => {
    console.log(result);
  });




//  client.close();
 });
