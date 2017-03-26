import React from 'react';
import SignUp from './SignUp.jsx';
import LogIn from './LogIn.jsx';
import { Jumbotron } from 'react-bootstrap';

// props.game === game instance object

const Home = (props) => (
  <div id="home">
	  <Jumbotron>
	    <h1>Oranges To Oranges</h1>
	    <p>This is a game where you and three friends take turns picking your favorite response to a random prompt. The person with the most favorites wins!</p>
	    <SignUp sendToLobby={props.route.sendToLobby}/>
	    <LogIn sendToLobby={props.route.sendToLobby} />
	  </Jumbotron>
  </div>
)


export default Home;