const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
      required:true,
      trim:true,
      type: String,
      minlength:1,
      unique: true,
      validate:{
        validator : validator.isEmail, //from the validator library
        message: '{VALUE} is not a valid email'
      }
    },
    password: {
      type: String,
      require: true,
      minlength: 6
    },
    tokens: [{  //mongoose specific
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }]
});

UserSchema.methods.toJSON = function (){
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id','email']);
};

UserSchema.methods.generateAuthToken = function (){
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access},'abc123').toString();

  user.tokens = user.tokens.concat([{access,token}]);

  return user.save().then(() => {
    return token;
  });


};

var User = mongoose.model('Users',UserSchema);

module.exports = {User};
