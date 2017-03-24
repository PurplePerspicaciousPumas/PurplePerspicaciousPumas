var express = require('express');
var bodyParser = require('body-parser');
var models = require('../db/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var User = models.userModel;
var Game = models.gameInstanceModel;
var queries = require('../db/db-queries.js');
var helpers = require('./helpers.js');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'orange-to-orange'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../client/dist'));

// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// mongoose.connect('mongodb://localhost/passport_local_mongoose_express4');

app.post('/signup', function (req, res) {
  User.register(new User({username: req.body.username, email: req.body.email}), req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    } 

    passport.authenticate('local')(req, res, function() {
      console.log('success', user);
      res.status(201).send('created');
    })
  });
})

app.post('/login', passport.authenticate('local'), function(req, res) {
  console.log('in login request');
  res.status(201).send('success')
})

app.get('/test', passport.authenticate('local'), function(req, res) {
  res.status(200).send('success')
})

app.get('/games', function(req, res) {
  var promise = Game.find({}).exec();

  promise.then(function(games) {
    res.json(games);
  })
});

app.get('/game', function(req, res) {
  var name = req.query.name;
  var promise = Game.find({gameName: name}).exec();

  promise.then(function(game) {
    res.json(game);
  })
});

app.get('/username', function(req, res) {
  var user = req.session.passport.user;
  res.status(200).send(user);
});


var server = app.listen(port, function() {
  console.log('App is listening on port: ', port);
});

var io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('a user connected to the socket');

  socket.on('join game', function(data) {
    // data needs to be gamename and username
    console.log('client joining room: ', data);
    socket.join(data.gameName);
    let username = data.username;
    let gameName = data.gameName;
    queries.retrieveGameInstance(gameName)
    .then(function (game){
    // add client to game DB if they're not already in players list
      if (!game.players.includes(username)) {
        let players = game.players.slice(0);
        players.push(username);
        return queries.addPlayerToGameInstance(gameName, players);
      }
    }).then(function () {
      return queries.retrieveGameInstance(gameName);
    }).then(function (game) {
    // then, check num of players in players list
      // if it's 4 and gameStage is waiting 
      if (game.players.length === 4 && game.gameStage === 'waiting') {
        // update gameStage in db from waiting to playing
        return queries.setGameInstanceGameStageToPlaying(gameName)
        .then(function () {
          return queries.retrieveGameInstance(gameName)
          .then(function (game) {
          // emit 'start game' event and send the game instance obj
            io.to(gameName).emit('start game', game);
          })
        });
      } 
    }).catch(function(error) {
      console.log(error)
      throw error;
    })
  })

  //TODO: write a helper function that retrieves a game instance obj given a name
  // TODO: also write a helper for updating the game instance obj

  // on 'submit response'
    // first, grab game instance obj
    // then check that username does not exist as index[1] of a response in responses array
      // if username doesn't exist yet, then add response to DB
  socket.on('submit response', (data) => {
    let gameName = data.gameName;
    let username = data.username;
    let response = data.response;

    queries.retrieveGameInstance(gameName)
    .then(function(game) {
      let currentRound = game.currentRound;
      let currentResponses = game.rounds[currentRound].responses;
      let currentRounds = game.rounds;

      if (!helpers.userAlreadySubmitted(username, currentResponses)) {
        currentRounds[currentRound].responses.push([response, username]);

        if (currentRounds[currentRound].responses.length === 3) {
          currentRounds[currentRound].stage++;
        }
        //update rounds property of the game in DB w/ new responses and stage
        return queries.updateRounds(gameName, currentRounds)
        .then(function() {
          if (currentRounds[currentRound].responses.length === 3) {
            return queries.retrieveGameInstance(gameName)
            .then(function(game) {
              io.to(gameName).emit('start judging', game);
            })
          }
        })
      }
    }).catch(function(error) {
      console.log(error);
      throw error;
    })
  })

    // check if there are 3 responses
      // if there are 3 responses go to current Round in round array and increment stage by 1
      // retrieve updated game from DB
      // emit 'start judging' with game instance obj as data

  // on 'judge selection'
  socket.on('judge selection', (data) => {
    let gameName = data.gameName;
    let winner = data.winner;
    console.log('judge selection', data.winner);
    queries.retrieveGameInstance(gameName)
    .then(function (game) {
      let currentRound = game.currentRound;
      let currentResponses = game.rounds[currentRound].responses;
      let Rounds = game.rounds.slice(0);
      Rounds[currentRound].winner = winner;
      Rounds[currentRound].stage++;
      console.log('rounds', Rounds);
      queries.updateRounds(gameName, Rounds)
      .then(function () {
        console.log('gameName', gameName);
        queries.retrieveGameInstance(gameName)
        .then(function (game) {
            if (game.currentRound < 3) {
              console.log('winner');
              io.to(gameName).emit('winner chosen', game);
            } else {
              console.log('game over');
              io.to(gameName).emit('game over', game);
            }
          })
        })
    }).catch(function(error) {
      console.log(error);
      throw error;
    })
  })
    // update game instance obj
      // at currentRounds in rounds array, set winner to be the username (given as data)
      // in same round, increment stage by 1 
      // if currentRound is less than 3
        // emit 'winner chosen' event with game instance obj as data
      // otherwise
        // emit 'game over' event with game instance obj

  // on 'ready to move on', 
    // retreive game instance obj
    // check if rounds at current round ready already contains that username
      // if not, add it to ready array 
      // if there are now 4 ready, increment currentRound by 1 
      // emit 'start next round' with game instance obj
  socket.on('ready to move on', (data) => {
    let gameName = data.gameName;
    let username = data.username;
    queries.retrieveGameInstance(gameName)
    .then(function(game) {
      let currentRound = game.currentRound;
      let Rounds = game.rounds.slice(0);
      if (!Rounds[currentRound].ready.includes(username)) {
        Rounds[currentRound].ready.push(username);
        queries.updateRounds(gameName, Rounds)
        .then(function() {
          if (Rounds[currentRound].ready.length === 4) {
            currentRound++;
          }
          queries.updateCurrentRound(gameName, currentRound)
          .then(function() {
            queries.retrieveGameInstance(gameName)
            .then(function(game) {
              io.to(gameName).emit('start next round', game);
            })
          })
        })
      }
    }).catch(function(error) {
      console.log(error);
      throw error;
    })
  })


  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

