import mongoose from 'mongoose';
import supergoose from 'supergoose';

var mongoose = require('mongoose');
var supergoose = require('supergoose');

var userSchema = new mongoose.Schema({
  storeName: String,
  accessToken: String
});

userSchema.plugin(supergoose, { instance: mongoose });

var User = mongoose.model('User', userSchema);
module.exports = User;