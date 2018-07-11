const mongoose = require('mongoose');

mongoose.Promise = global.Promise; //there are several versions of promises, we use the built in one
mongoose.connect('mongodb://localhost:27017/TodoApp');
 module.exports = {mongoose};
