var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/orange-to-orange');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var dummyGames = require('./dummy-data');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var gameInstanceSchema = new Schema({
  id: Number,
  gameName: String,
  password: String,
  players: Array, 
  rounds: Array, 
  currentRound: Number,
  gameStage: {type: String, default: 'waiting'}
});

var userSchema = new Schema({
	username: {type: String, unique: true },
	password: String,
	email: String,
});

userSchema.plugin(passportLocalMongoose);

var gameInstanceModel = mongoose.model('gameInstanceModel', gameInstanceSchema);

//COMMENT THIS OUT DURING GAME TESTING
//Clearout database 
var collection = db.collection('gameinstancemodels');
collection.remove({});

var gameOne = new gameInstanceModel(dummyGames.gameOne)

gameOne.save(function (err, game) {
	if (err) {
		console.log('error', error);
		return
	} else {
	 console.log('gameAdded', game);
	}
});


var gameTwo = new gameInstanceModel(dummyGames.gameTwo)

gameTwo.save(function (err, game) {
	if (err) {
		console.log('error', error);
		return
	} else {
	 console.log('gameAdded', game);
	}
});

var gameThree = new gameInstanceModel(dummyGames.gameThree)

gameThree.save(function (err, game) {
	if (err) {
		console.log('error', error);
		return
	} else {
	 console.log('gameAdded', game);
	}
});

var gameFour = new gameInstanceModel(dummyGames.gameFour)

gameFour.save(function (err, game) {
	if (err) {
		console.log('error', error);
		return
	} else {
	 console.log('gameAdded', game);
	}
});


module.exports.gameInstanceModel = gameInstanceModel;
module.exports.userModel = mongoose.model('userModel', userSchema);