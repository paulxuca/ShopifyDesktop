import mongoose from 'mongoose';
import supergoose from 'supergoose';

const userSchema = new mongoose.Schema({
  storeName: String,
  accessToken: String
});

userSchema.plugin(supergoose, { instance: mongoose });

const User = mongoose.model('User', userSchema);
export default User;