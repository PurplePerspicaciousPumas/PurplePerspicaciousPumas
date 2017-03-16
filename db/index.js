var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/greenfield');

var db = mongoose.conncetion;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var gameInstanceSchema = mongoose.schema({
  id: Number,
  gameName: String,
  password: String,
  players: Array, 
  rounds: Array, 
  currentRound: Number
});

var userSchema = mongoose.schema({
	username: {type: String, unique: true }
});

module.exports.gameInstanceModel = mongoose.model('gameInstanceModel', gameInstanceSchema);
module.exports.userModel = mongoose.model('userModel', userSchema);