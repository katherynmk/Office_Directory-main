const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect("mongodb+srv://<username>:<password>@cluster0.vvd1s.mongodb.net/?retryWrites=true&w=majority",{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Auth schema
const Schema = mongoose.Schema;

const User = new Schema({
  username: String,
  password: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('userData', User, 'userData');