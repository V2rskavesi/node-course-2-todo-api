const mongoose = require('mongoose');

var User = mongoose.model('Users',{
  email: {
    required:true,
    trim:true,
    type: String,
    minlength:1
  }
});

module.exports = {User};
