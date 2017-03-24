import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import SignUp from './components/SignUp.jsx';
import { Router, Route, hashHistory } from 'react-router';
import Lobby from './components/Lobby.jsx';
import Home from './components/Home.jsx';
import Game from './components/Game.jsx';
// import io from 'socket.io-client';

class App extends React.Component {
    constructor(props){
      super(props);
      this.state = {}

      this.handleSignUp = this.handleSignUp.bind(this);
      this.handleLogIn = this.handleLogIn.bind(this);
      this.sendToGame = this.sendToGame.bind(this);
    }

    handleSignUp(email, username, password) {
      $.ajax({
        url: 'http://localhost:3000/signup',
        method: 'POST',
        headers: {'content-type': 'application/json'},
        data: JSON.stringify({'username': username, 'email': email, 'password': password}),
        success: (data) => {
          console.log('added user to users DB');
          console.log(data);
          hashHistory.push('/lobby');
        },
        error: (err) => {
            console.log('error in username POST: ', err);
        }
      });
    }

    handleLogIn(username, password) {
      console.log(username, password);
      $.ajax({
        url: 'http://localhost:3000/login',
        method: 'POST',
        headers: {'content-type': 'application/json'},
        data: JSON.stringify({'username': username, 'password': password}),
        success: (data) => {
          console.log('added user to users DB');
          console.log(data);
          hashHistory.push('/lobby');
        },
        error: (err) => {
            console.log('error in login POST: ', err);
        }
      });
    }

    sendToGame(gameName) {
      console.log(gameName);
      hashHistory.push(/game/ + gameName);
    }

    render() {
      return (
        <div>
          <Router history={hashHistory}>
            <Route path="/" component={Home} onSignUp={this.handleSignUp} onLogIn={this.handleLogIn}/>
            <Route path="/lobby" component={Lobby} sendToGame={this.sendToGame}/>
            <Route path="/game/:gamename" component={Game} />
          </Router>
        </div>
      );
    }
}
             //   <SignUp onSubmit={this.handleSignUp}/>

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);

