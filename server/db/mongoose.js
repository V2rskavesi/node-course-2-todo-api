const mongoose = require('mongoose');

mongoose.Promise = global.Promise; //there are several versions of promises, we use the built in one

mongoose.connect(process.env.MONGODB_URI);
 module.exports = {mongoose};
// mongodb://Testguy:testguy1@ds243041.mlab.com:43041/node-todo-api-mongodb
