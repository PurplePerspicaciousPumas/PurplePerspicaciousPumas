var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var models = require('index.js');
var mongoose = require('mongoose');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/users', function (req, res) {
  var username = req.body.username;
  var user = new models.userModel({
  	username: username
  });
  user.save(function(err) {
  	if (err) {
  		res.status(400).send('username exists')
  	} else {
  		res.status(201).send('success')
  	}
  })

});

var server = app.listen(port, function() {
  console.log('App is listening on port: ', port);
});

var io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

