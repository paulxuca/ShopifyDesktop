var mongoose = require('mongoose');
var supergoose = require('supergoose');

var userSchema = new mongoose.Schema({
  storeName: String,
  accessToken: String,
  webhooksSetUp: {
  	type: Boolean,
  	default: false
  }
  events:[String]
});

userSchema.plugin(supergoose, { instance: mongoose });

var User = mongoose.model('User', userSchema);
module.exports = User;